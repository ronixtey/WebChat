const chat = $.connection.chatHub;

function AppViewModel() {
    this.name = ko.observable('');
    this.isMessageEmpty = ko.observable(false);

    this.clickHandler = () => {
        if (!this.name())
            return this.name(prompt('Enter your name:', ''));
        if (!$('#message').val())
            return this.isMessageEmpty(true);

        chat.server.send(this.name(), $('#message').val());
        $('#message').val('').focus();
    };
}

$.connection.hub
    .start()
    .done(() => {
        const viewModel = new AppViewModel();
        ko.applyBindings(viewModel);
        // фокусироваться каждый раз на input, после ввода имени
        viewModel.name.subscribe(() => $('#message').focus());

        viewModel.name(prompt('Enter your name:', ''));
    });


chat.client.send = (name, message) => {
    $('#discussion').append(`
        <li>
            (${new Date().toLocaleTimeString()}) <strong> ${htmlEncode(
        name
    )}</strong >: ${htmlEncode(message)}
        </li>
    `);
};

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}