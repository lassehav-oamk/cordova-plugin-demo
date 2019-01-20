let app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('contactReadButton').addEventListener('click', this.onReadContacts, false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    onReadContacts: function()
    {
        let options      = new ContactFindOptions();
        options.filter   = "";
        options.multiple = true;
        options.hasPhoneNumber = true;
        let fields       = [
            navigator.contacts.fieldType.displayName,
            navigator.contacts.fieldType.name,
            navigator.contacts.fieldType.phoneNumbers,
            navigator.contacts.fieldType.familyName];

        /* Read the contacts via plugin */
        navigator.contacts.find(
            fields,
            contacts => {
                let targetElement = document.getElementById('target');
                contacts.forEach(contact => {
                    let contactElement = document.createElement('div');
                    contactElement.appendChild(document.createTextNode(contact.displayName));
                    targetElement.appendChild(contactElement);
                });
            },
            error => alert('Error reading contacts'),
            options);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        document.getElementById('deviceReadyTarget').innerHTML = '<b style="color: green">Device ready event received!<b>';
    }
};

app.initialize();