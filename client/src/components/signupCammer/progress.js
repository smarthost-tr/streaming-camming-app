import React from "react";
import Progress from 'react-progressbar';

const ProgressBar = (props) => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-12">
					<h6 className="text-center bold" style={{ paddingTop: "30px" }}>You are {props.progress}% complete with the camming registration!</h6>
					<Progress style={{ width: "100%" }} color="#871eff" completed={props.progress} />
				</div>
			</div>
		</div>
	);
}

export default ProgressBar;