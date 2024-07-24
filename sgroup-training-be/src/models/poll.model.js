// import e from "express";
import pool from "../database/database.connection.js";

class PollModel {

    async getAllPolls () {
        try {
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM votes');
            connection.release();
            return rows; 
        } catch (error) {
            throw error;
        }
    }

    async createPoll(poll, userId) {
        try {
            const connection = await pool.getConnection();
            const insertQuery = `
            INSERT INTO votes (voteTitle, voteQuestion, createdAt, createdUser)
            VALUES (?, ?, ?, ?)
            `;
            const {voteTitle, voteQuestion, createdAt} = poll; 
            const values = [poll.voteTitle, poll.voteQuestion, poll.createdAt, userId];
            // await connection.query(insertQuery, values);
            // const voteId = poll.Id;
            const [result] = await connection.query(insertQuery, values);
            const voteId = result.insertId;
            await this.addOptions(poll.options, voteId);
            connection.release();
            return { 
                success: true, 
                message: 'Poll created successfully', 
                data: { ...poll, id: voteId }
            };
        } catch (error) {
            throw error;
        }
    }

    async addOptions (options, voteId) {
        try {
            const connection = await pool.getConnection();
            const insertQuery = `
            INSERT INTO voteoptions (voteOption, voteId)
            VALUES (?,?)
            `;

            const addOptions = options.map(option => {
                const optionValues = [option, voteId];
                return connection.query(insertQuery, optionValues);
            });
    
            await Promise.all(addOptions);
            
            
            connection.release();
            return { 
                success: true, 
                message: 'Options created successfully', 
                data: options, voteId 
            };
        } catch (error) {
            throw error;
        }
    }

    async getPollByID(pollId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM votes WHERE id = ?`; 
            const value = [pollId];
            const [rows,fields] = await connection.query(query, value);
            // console.log(`rows: ${rows}`);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async getOptionByID(optionId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM voteoptions WHERE id = ?`; 
            const value = [optionId];
            const [rows,fields] = await connection.query(query, value);
            // console.log(`rows: ${rows}`);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async updatePoll(pollId, poll, userId){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE votes SET voteTitle = ?, voteQuestion = ?, createdAt = ?, createdUser = ?  WHERE id = ?`; 
            const {voteTitle, voteQuestion, createdAt} = poll;
            const value = [poll.voteTitle, poll.voteQuestion, poll.createdAt, userId, pollId];
            console.log("Updated:", poll);
            await connection.query(query, value);
            return { success: true, message: 'Poll created successfully' };
        } catch(error){
            throw error;
        }
    }

    async updateOption(pollId, optionId, option){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE voteoptions SET voteOption = ?, count = ?, voteId = ?  WHERE id = ?`; 
            const {voteOption, count, voteId} = option;
            const value = [option.voteOption, option.count, pollId, optionId];
            console.log("Updated:", option);
            await connection.query(query, value);
            return { success: true, message: 'Poll created successfully' };
        } catch(error){
            throw error;
        }
    }

    async deletePoll(pollId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM votes WHERE id = ?`; 
            const value = [pollId];
            await connection.query(query, value);
            return { success: true, message: 'Poll deleted successfully' };
        }catch(error){
            throw error;
        }
    }

    async deleteOption(pollId, optionId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM voteoptions WHERE id = ? AND voteId = ?`; 
            const value = [optionId, pollId];
            await connection.query(query, value);
            return { success: true, message: 'Option deleted successfully' };
        }catch(error){
            throw error;
        }
    }


    async voteOptions (pollId, options, userId) {
        try {
            const connection = await pool.getConnection();

            const [currentVotes] = await connection.query(
                `SELECT voteOptionId FROM voteresults WHERE voteId = ? AND voteUser = ?
                `,[pollId, userId]
            );

            console.log('currentVotes', currentVotes);

            await connection.query(
                `DELETE FROM voteresults WHERE voteId = ? AND voteUser = ?
                `, [pollId, userId]
            );

            const resetCount = currentVotes.map(vote => 
                connection.query(
                    `UPDATE voteoptions SET count = count - 1 WHERE id = ?
                    `, [vote.voteOptionId]
                )
            )
            await Promise.all(resetCount);

            const voteAdd = options.map(async optionId => {
                const [rows] = await connection.query(
                    `SELECT * FROM voteoptions WHERE voteId = ? AND id = ?
                    `, [pollId, optionId]
                );
                if (rows.length === 0) {
                    throw new Error('NOT FOUND: Option ID = ${optionId}');
                }

                await connection.query(
                    `INSERT INTO voteresults (voteId, voteOptionId, voteUser) VALUES (?, ?, ?)
                    `, [pollId, optionId, userId]
                );

                await connection.query(
                    `UPDATE voteoptions SET count = count + 1 WHERE id = ?
                    `, [optionId]
                );
            });

            await Promise.all(voteAdd);

            connection.release();
            return { 
                success: true, 
                message: 'Voted successfully', 
                data: {options, id: pollId }
            };
        } catch (error) {
            throw error;
        } 
    }

    async unvoteOptions (pollId, options, userId) {
        try {
            const connection = await pool.getConnection();

            const [currentVotes] = await connection.query(
                `SELECT voteOptionId FROM voteresults WHERE voteId = ? AND voteUser = ?
                `,[pollId, userId]
            );

            console.log('currentVotes', currentVotes);
            const voteDelete = options.map(async optionId => {
                const voteNeedDetele = currentVotes.some(optionCurrentId => {
                    console.log("optionId", optionId);
                    console.log("optionCurrentId.voteOptionId", optionCurrentId.voteOptionId);

                    if (optionId == optionCurrentId.voteOptionId)
                        return true;
                    throw new Error('NOT FOUND: Vote at option ID = ${optionId}');
                })
                
                await connection.query(
                    `DELETE FROM voteresults WHERE voteId = ? AND voteUser = ? AND voteOptionId = ?
                    `, [pollId, userId, optionId]
                );
                await connection.query(
                    `UPDATE voteoptions SET count = count - 1 WHERE id = ?
                    `, [optionId]
                )   
            })
            await Promise.all(voteDelete);


            connection.release();
            return { 
                success: true, 
                message: 'Unvoted successfully', 
                data: {options, id: pollId }
            };
        } catch (error) {
            throw error;
        } 
    }

    async getPollWithDetails(pollId) {
        const connection = await pool.getConnection();
        try {
            const query = `
            SELECT votes.id as voteId, votes.voteTitle, votes.voteQuestion, votes.createdAt, votes.createdUser,
                   voteoptions.id as optionId, voteoptions.voteOption, voteoptions.count,
                   voteresults.voteId as resultId, voteresults.voteOptionId, voteresults.voteUser,
                   users.ID as userId, users.name
            FROM votes
            JOIN voteoptions ON votes.id = voteoptions.voteId
            LEFT JOIN voteresults ON voteoptions.id = voteresults.voteOptionId
            LEFT JOIN users ON voteresults.voteUser = users.ID
            WHERE votes.id = ?
            `;

            const [records] = await connection.query(query, [pollId]);
            return records;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}

export default new PollModel();