const Schedule = require('../model/Schedule');
const role = require("../../user/enums/role");
const error = require("../../../utils/error");

module.exports = async (user, id) => {
   const schedule = await Schedule.findById(id).select();
   if(!schedule){
      return;
   }
   if (schedule && user.role === role.ADMINISTRATOR || user._id.toString() === schedule.userId.toString()) {
      await Schedule.findOneAndDelete({ _id: id });
   }else{
      throw await error([{msg: 'Usuario não autorizado!'}]);
   }
};