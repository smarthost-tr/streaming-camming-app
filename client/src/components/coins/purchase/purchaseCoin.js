import React, { Component } from 'react';
import Navigation from "../../navigation/index.js";
import FooterPage from "../../common/footer/footer.js";


class PurchaseTokensPayment extends Component {
constructor(props) {
    super(props);


}

    render() {
    	const tokens = this.props.location.state.tokens;
    	console.log(this.props.location.state.tokens);
        return (
            <div>
				<Navigation />
                    <div className="container" style={{ height: "100vh" }}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="text-center bold">Purchase Tokens Page Two - Tokens being purchased: {tokens}</h1>
                            </div>
                        </div>
                    </div>
                <FooterPage />
            </div>
        );
    }
}

export default PurchaseTokensPayment;
