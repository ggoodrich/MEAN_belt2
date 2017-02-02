var mongoose = require('mongoose'),
	Poll = mongoose.model('Poll');
	Option = mongoose.model('Option');

function PollsController() {
	this.index = function(req,res){
		Poll.find({}).populate('_user').exec(function(err,results){
			if(err){
				console.log('!!! error in polls_controller this.index',err)
			} else {
				res.json(results);
			}
		})
	}
	this.options = function(req,res){
		Option.find({_poll:req.params.id}).populate('_poll').exec(function(err,results){
			res.json(results);
		})
	}
	this.new = function(req,res){
		// console.log(req.body.user);
		// console.log(req.body.poll);
		console.log(req.body);
		
		if(req.body.poll == undefined){
			res.json( {type: "reject", data: "You cannot submit an empty poll"} )
		} else {
			if(req.body.poll.question == undefined || req.body.poll.question.length < 8){
				console.log("Question needs a minimum of 8 characters.")
				res.json( {type: "reject", data: "The question needs a minimum of 8 characters."} )
			} else if (req.body.poll.options.option1 == undefined || req.body.poll.options.option1.length <3){
				console.log("Option 1 needs a minimum of 3 characters.")
				res.json( {type: "reject", data: "Option 1 needs a minimum of 3 characters."} )
			} else if (req.body.poll.options.option2 == undefined || req.body.poll.options.option2.length <3){
				console.log("Option 2 needs a minimum of 3 characters.")
				res.json( {type: "reject", data: "Option 2 needs a minimum of 3 characters."} )
			} else if (req.body.poll.options.option3 == undefined || req.body.poll.options.option3.length <3){
				console.log("Option 3 needs a minimum of 3 characters.")
				res.json( {type: "reject", data: "Option 3 needs a minimum of 3 characters."} )
			} else if (req.body.poll.options.option4 == undefined || req.body.poll.options.option4.length <3){
				console.log("Option 4 needs a minimum of 3 characters.")
				res.json( {type: "reject", data: "Option 4 needs a minimum of 3 characters."} )
			}
			else {
			question = req.body.poll.question;
			option1 = req.body.poll.options.option1;
			option2 = req.body.poll.options.option2;
			option3 = req.body.poll.options.option3;
			option4 = req.body.poll.options.option4;
			var newPoll = new Poll({
			question: req.body.poll.question,
			_user: req.body.user
			});

			newPoll.save(function(err,newPoll){
				if(err){
					console.log("!!!! poll was not created",err);
				} else {
					console.log("New Poll Question Created!",newPoll._id)
					optionsArray = [option1,option2,option3,option4];
					for (option in optionsArray){
						var newOption = new Option({
							option: optionsArray[option],
							_poll: newPoll._id,
							count: 0,
						})
						newOption.save(function(err,newOption){
							if(err){
								console.log("!!! option was not created");
							}
							else{
								console.log("New Poll Option Created!", newOption._id);
								
							}
						})
					}
					res.json( { type: 'success', data: "text goes here" } );
				}
			})
			}
		}	
		
	};
	this.addVote = function(req,res){
		option_id = req.body.option;
		var option = Option.findOne({_id:option_id});

		option.exec(function(err,option){
			if(err){
				console.log("!!! error in addVote option query (findOne)")
			}
			else {
				option.count += 1;
				option.save();
				res.json(option);
			}
		})

	};
	this.delete = function(req,res){
		console.log(req.params.id);
		var pollRemove = Poll.remove({_id:req.params.id})
		pollRemove.exec(function(err,removed){
			if(err){
				console.log("!!! error in delete poll query")
			}
			else {
				res.json({type: 'success', data: 'poll deleted'})
			}
		})
		
	}

};
module.exports = new PollsController();