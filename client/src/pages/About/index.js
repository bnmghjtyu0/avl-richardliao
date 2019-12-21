import React from "react";
import withLayout from "../../container/withLayout";
import StripeCheckout from 'react-stripe-checkout';
const About = () => {
  const onToken = (token, addresses) => {
    console.log('stripeToken', token)
    console.log('stripeAddresses', addresses)
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  return (
    <div>
      <StripeCheckout
        token={onToken}
        stripeKey="pk_test_eUWw7X89r3zFSYAIImdNtCFr00xY0ajQmM"
      />
    </div>
  )
};
export default withLayout(About);