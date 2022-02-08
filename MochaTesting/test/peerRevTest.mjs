/*	Tests a straightforward algorithmic function that
	assigns assignments to reviewers/students, and reviewers 
	to assignments. See bottom of file for example of
	algorithm parameters and output.
*/
import {reviewAssignment} from  '../peerAlg4.mjs';
import chai from 'chai';
const assert = chai.assert;

describe('Peer Assignment Algorithm Tests', function () {
	let numStudents = 15,
		numReviews = 5,
		randomize = true,
		assignments, reviews;
	beforeEach(function(){
		[assignments, reviews] = reviewAssignment(numStudents, numReviews, randomize);
	});
	
	describe('Array and Set Checks', function(){
		it('Length reviews and assignments', function(){
			assert.isArray(reviews);
			assert.isArray(assignments);
			assert.lengthOf(reviews, numStudents, 'Every student reviews');
			assert.lengthOf(assignments, numStudents, 'Every assignment is reviewed');
		});
		it('Reviewers and Reviewees', function(){
			reviews.forEach(function(r){
				assert.lengthOf(r.reviewees, numReviews, 'Each student must perform M reviews');
			});
			assignments.forEach(function(a){
				assert.lengthOf(a.reviewers, numReviews, 'Each assignment must have M reviewers');
			});
		});
	});
	
	describe('Cannot review yourself checks', function(){
		it('Assignment cannot be reviewed by author', function(){
			assignments.forEach(function(a){
				assert(!a.reviewers.has(a.student));
			})
		});
		it('Reviewer cannot review themself', function(){
			reviews.forEach(function(r){
				assert(!r.reviewees.has(r.student));
			})
		});
	});
	
	describe('Bad Input Checks', function(){
		it('Zero or negative parameters', function(){
			assert.throws(reviewAssignment.bind(null, 0, numReviews, randomize));
			assert.throws(reviewAssignment.bind(null, numStudents, 0, randomize));
			assert.throws(reviewAssignment.bind(null, -3, -5, randomize));
		});
		it('numReviews > numStudents', function(){
			assert.throws(reviewAssignment.bind(null, 10, 15));
		});
	});
	
});

/*
// Example run of algorithm

let numStudents = 15;
let numReviews = 5;
let randomize = true;
console.log("Starting Algorithm");
let [assignments, reviews] = reviewAssignment(numStudents, numReviews, randomize);
console.log("Finished Algorithm");
// Look at the results
for (let i = 0; i < numStudents; i++) {
	console.log(assignments[i]);
	console.log(reviews[i]);
	console.log("\n");
}

*/


/* Example Result:

{ student: 0, reviewers: Set { 5, 9, 3, 4, 2 } }
{ student: 0, reviewees: Set { 14, 12, 11, 6, 8 } }


{ student: 1, reviewers: Set { 14, 12, 11, 6, 8 } }
{ student: 1, reviewees: Set { 4, 2, 13, 10, 7 } }


{ student: 2, reviewers: Set { 13, 10, 7, 1, 14 } }
{ student: 2, reviewees: Set { 0, 5, 9, 3, 4 } }


{ student: 3, reviewers: Set { 4, 2, 13, 10, 7 } }
*/
