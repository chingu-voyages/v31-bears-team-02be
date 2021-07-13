import * as React from "react";
import "./leaderboard.css";


const Leaderboard = () => {

	// leaderboard obj response from backend:
	// const leaderboardArr = [ {"user_id": 1, "username": "joel", "sum": 420}, {"user_id": 2, "username": "max", "sum": 30} ];

	// FOR TESTING ONLY
	const leaderboardArr = [ {"user_id": 1, "username": "joel", "sum": 420}, {"user_id": 2, "username": "max", "sum": 30} ];
	// 420 refers to sum of all correct points that user has got in all games

	const leaderboard = leaderboardArr.map((users, idx) => {
		return (
			<div key={idx} className="leaderboard-row">
				<ul className="leaderboard-ul">
					<li className="leaderboard-rank">{idx + 1}</li>  {/* +1 rank because indexing starts at 0 */}
					<li className="leaderboard-name">{users.username}</li>
					<li className="leaderboard-total_score">{users.sum}</li>
				</ul>
			</div>
		);
	});


	// TODO:
	// - react hook to make call to DB to get leaderboard object
	// - ? What lifecycle method should this call be made?
	// - render leaderboard


  return (
    <div className="leaderboard-wrap">
			<div className="leaderboard-inner">
				{leaderboard} 
			</div>
    </div >
  )
};


export default Leaderboard;
