exports.register = function () {
    this.loginfo("Verification plugin initialized");
};

exports.hook_rcpt = function (next, connection, params) {
    const rcpt = params[0];
    const transaction = connection.transaction;

    // Logic: If the mail is going to a 'verification' address, 
    // we can tag the transaction for special handling.
    if (rcpt.user.startsWith('verify-')) {
        connection.loginfo(this, `Automation Triggered for: ${rcpt.address}`);
        // You could add a custom header here that your UI will read later
        transaction.add_header('X-Automation-Type', 'Registration');
    }

    next();
};

exports.hook_data_post = function (next, connection) {
    // This runs after the email body is received but before it's saved.
    // Perfect for triggering a Slack notification or an external API.
    const subject = connection.transaction.header.get('Subject');
    this.logdebug(`Processing automated mail: ${subject}`);
    
    next();
};