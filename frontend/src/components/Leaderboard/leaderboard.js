import * as React from "react";
import { useEffect, useState } from "react";
import gameAPI from '../../services/api';
import "./leaderboard.css";


const Leaderboard = () => {

	// destructure array returned from useState, and initialize variables
	const [ leaderboard, setLeaderboard ] = useState(null);		// initialize state to null
	const [ loading, setLoading ] = useState(true);

	// useEffect is similar to componentDidMount and componentDidUpdate
	// API call to fetch leaderboard made here
	// callback will run once after component mounts (if empty array is passed)
	useEffect(async () => {

		const game = { ...gameAPI() };
		
		// leaderboard obj response from backend:
		// const response = [ {"user_id": 1, "username": "joel", "sum": 420}, {"user_id": 2, "username": "max", "sum": 30} ];
		// 420 refers to sum of all correct points that user has got in all games
		const response = await game.getLeaderboard();

		setLeaderboard(response);
		setLoading(false);
	}, []);


	// FOR TESTING ONLY
	// const leaderboardArr = [ {"user_id": 1, "username": "joel", "sum": 420}, {"user_id": 2, "username": "max", "sum": 30} ];

	let rows;
	if (leaderboard) {
		rows = leaderboard.map((users, idx) => {
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
	}


  return (
    <div className="leaderboard-wrap">
			<div className="leaderboard-inner">
				{loading ? <div>...loading</div> : rows}
			</div>
    </div >
  )
};


export default Leaderboard;
