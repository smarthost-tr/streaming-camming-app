import React from 'react';
import Navigation from "../navigation/index.js";
import Footer from "../common/footer/footer.js";

class CashoutHomepage extends React.Component {
	render() {
		return (
			<div>
				<Navigation />
					<h1 className="text-center">Cashout Page.</h1>
				<Footer />
			</div>
		)
	}
}

export default CashoutHomepage;