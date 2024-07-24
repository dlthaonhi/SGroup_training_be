import PollService from "./poll.service.js";

 
class PollController {

    async getPolls(req, res) {
        try {
            const polls = await PollService.getPolls();
            return res.status(200).json({
                success: true,
                data: polls
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
        
    }

    async createPoll(req,res) {
        try {
            const newPoll = {
                voteTitle: req.body.voteTitle,
                voteQuestion: req.body.voteQuestion,
                createdAt: new Date(Date.now()),
                options: req.body.options
            };
            if (!voteTitle || !voteQuestion || !options || !Array.isArray(options)) 
                return res.status(400).json({
                    success: false,
                    message: "Error req: Missing fields"
                });
            await PollService.createPoll(newPoll, req.userId);
            return res.status(200).json({
                success: true,
                message: "Create poll successfully"
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async updatePoll(req, res){
        try{
            const pollId = req.params.pollId;
            if (!pollId) return res.status(400).json({
                success: false,
                message: "Error req: Missing pollId"
            });
            const poll = await PollService.getPollByID(pollId);
            if (!poll) return res.status(404).json({
                success: false,
                message: "Poll: NOT FOUND!"
            });
            const newInfo = req.body;
            const newPoll = {...poll, ...newInfo};
            await PollService.updatePoll(pollId, newPoll,req.userId);
            return res.status(200).json({
                success: true,
                message: "Updated Poll"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async deletePoll(req, res){
        try{
            const pollId = req.params.pollId;
            if (!pollId) return res.status(400).json({
                success: false,
                message: "Error req: Missing pollId"
            });
            await PollService.deletePoll(pollId);
            return res.status(200).json({
                success: true,
                message: "Deleted Poll"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createOptions (req,res) {
        try {
            const pollId = req.params.pollId;
            const options = req.body.options
            if (!pollId || !options || !Array.isArray(options)) 
                return res.status(400).json({
                    success: false,
                    message: "Error req: Missing fields"
                });
            await PollService.createOptions(options, pollId);
            return res.status(200).json({
                success: true,
                message: "Create option successfully"
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateOption(req, res){
        try{
            const pollId = req.params.pollId;
            const optionId = req.params.optionId;
            if (!pollId || !optionId) return res.status(400).json({
                success: false,
                message: "Error req: Missing pollId"
            });
            const poll = await PollService.getPollByID(pollId);
            if (!poll) return res.status(404).json({
                success: false,
                message: "Poll: NOT FOUND!"
            });
            const option = await PollService.getOptionByID(optionId);
            if (!option) return res.status(404).json({
                success: false,
                message: "Option: NOT FOUND!"
            });
            const newInfo = req.body.option;
            option.voteOption = newInfo;
            await PollService.updateOption(pollId, optionId,option);
            return res.status(200).json({
                success: true,
                message: "Updated Option"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteOption(req, res){
        try{
            const pollId = req.params.pollId;
            const optionId = req.params.optionId;
            if (!pollId || !optionId) return res.status(400).json({
                success: false,
                message: "Error req: Missing pollId or optionId"
            });
            await PollService.deleteOption(pollId, optionId);
            return res.status(200).json({
                success: true,
                message: "Deleted Option"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    async voteOptions (req, res) {
        try {
            const pollId = req.params.pollId;
            const options = req.body.options;
            const userId = req.userId;
            if (!pollId || !options || !Array.isArray(options))
                return res.status(400).json({
                    success: false,
                    message: "Error req: Missing fields"
                });
            await PollService.voteOptions(pollId, options, userId);
            return res.status(200).json({
                success: true,
                message: "Vote recorded successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async unvoteOptions (req, res) {
        try {
            const pollId = req.params.pollId;
            const options = req.body.options;
            const userId = req.userId;
            if (!pollId || !options || !Array.isArray(options))
                return res.status(400).json({
                    success: false,
                    message: "Error req: Missing fields"
                });
            await PollService.unvoteOptions(pollId, options, userId);
            return res.status(200).json({
                success: true,
                message: "Unvote recorded successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getPollWithDetails (req,res) {
        try {
            const pollId = req.params.pollId;
            if (!pollId)
                return res.status(400).json({
                    success: false,
                    message: "Error req: Missing fields"
                });
            const records = await PollService.getPollWithDetails(pollId);
            if (!records || records.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'NOT FOUND: Poll'
                });
            }
            // console.log(records);
            let optionIds = [];
            const recordsWithOption = records.filter(record => {
                if(optionIds.every(optionId => {
                    return record.optionId != optionId
                })) {
                    optionIds.push(record.optionId);
                    return record;
                }
            })

            console.log(recordsWithOption);

            return res.status(200).json({
                success: true,
                data: {
                    voteId: records[0].voteId,
                    voteTitle: records[0].voteTitle,
                    voteQuestion: records[0].voteQuestion,
                    createdAt: records[0].createdAt,
                    createdUser: records[0].createdUser,
                    options: recordsWithOption.map(record => ({
                        optionId: record.optionId,
                        voteOption: record.voteOption,
                        count: record.count,
                        // resultId: record.resultId,
                        // voteOptionId: record.voteOptionId,
                        // voteUser: record.voteUser,
                        // userId: record.userId,
                        // name: record.name
                    }))
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getOptionlWithDetails (req,res) {
        try {
            const pollId = req.params.pollId;
            const optionId = req.params.optionId;
            if (!pollId || !optionId)
                return res.status(400).json({
                    success: false,
                    message: "Error req: Missing fields"
                });
            const records = await PollService.getPollWithDetails(pollId);
            if (!records || records.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'NOT FOUND: Poll'
                });
            }
            // console.log(records);
            // let optionIds = [];
            // const recordsWithOption = records.filter(record => {
            //     if(optionIds.every(optionId => {
            //         return record.optionId != optionId
            //     })) {
            //         optionIds.push(record.optionId);
            //         return record;
            //     }
            // })

            const option = await PollService.getOptionByID(optionId);
            if (!option) return res.status(404).json({
                success: false,
                message: "Option: NOT FOUND!"
            });
            console.log(option);

            // console.log(recordsWithOption);

            return res.status(200).json({
                success: true,
                data: {
                    voteId: records[0].voteId,
                    voteTitle: records[0].voteTitle,
                    voteQuestion: records[0].voteQuestion,
                    createdAt: records[0].createdAt,
                    createdUser: records[0].createdUser,
                    options: recordsWithOption.map(record => ({
                        optionId: record.optionId,
                        voteOption: record.voteOption,
                        count: record.count,
                        // resultId: record.resultId,
                        // voteOptionId: record.voteOptionId,
                        // voteUser: record.voteUser,
                        // userId: record.userId,
                        // name: record.name
                    }))
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new PollController();