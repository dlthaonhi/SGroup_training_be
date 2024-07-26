import PollModel from "../../models/poll.model.js";

class PollService {

    async getPolls() {
        try {
            const polls = await PollModel.getAllPolls();
            return polls;
        } catch (error) {
            throw error;
        }

    }

    async createPoll (poll, userId) {
        try {
            await PollModel.createPoll(poll, userId);
            return true;
        } catch (error) {
            throw error
        }
        
    }

    async getPollByID (pollId){
        try {
            const poll = await PollModel.getPollByID(pollId);
            return poll;
        }catch(error){
            throw error;
        }
    }

    async getOptionByID (optionId){
        try {
            const option = await PollModel.getOptionByID(optionId);
            return option;
        }catch(error){
            throw error;
        }
    }

    async updatePoll(pollId, poll, userId){
        try {
            await PollModel.updatePoll(pollId, poll, userId);
            return true;
        }catch(error){
            throw error;
        }
    }

    async updateOption(pollId, optionId,option){
        try {
            await PollModel.updateOption(pollId, optionId,option);
            return true;
        }catch(error){
            throw error;
        }
    }


    async deletePoll(pollId){
        try {
            await PollModel.deletePoll(pollId);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteOption(pollId, optionId){
        try {
            await PollModel.deleteOption(pollId, optionId);
            return true;
        }catch(error){
            throw error;
        }
    }

    async createOptions (options, pollId) {
        try {
            await PollModel.addOptions(options, pollId);
            return true;
        } catch (error) {
            throw error
        }
        
    }

    async voteOptions (pollId, options, userId) {
        try {
            await PollModel.voteOptions(pollId, options, userId);
            return true;
        } catch (error) {
            throw error
        }
    }

    async unvoteOptions (pollId, options, userId) {
        try {
            await PollModel.unvoteOptions(pollId, options, userId);
            return true;
        } catch (error) {
            throw error
        }
    }

    async getPollWithDetails(pollId) {
        try {
            const pollDetails = await PollModel.getPollWithDetails(pollId);
            return pollDetails;
        } catch (error) {
            throw error;
        }

    }
}

export default new PollService();