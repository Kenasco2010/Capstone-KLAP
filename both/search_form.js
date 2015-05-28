Schema = {};
Schema.search = new SimpleSchema({
    type_of_search: {
        type: String,
        label: "What do you want to do?",
        autoform: {
            type: "selectize",
            options: function() {
                return [
                    {label: "Send a package", value: "Send a package"},
                    {label: "Carry a package", value: "Carry a package"}
                ];
            }
        }
    },
    origin_country: {
        type: String,
        autoform: {
            placeholder: "From which country",
            type: "selectize",
            options: function() {
                return [
                    {label: "USA", value: "USA"},
                    {label: "Ghana", value: "Ghana"},
                    {label: "UK", value: "UK"}
                ];
            }
        }
    },
    destination_country: {
        type: String,
        autoform: {
            placeholder: "To which country",
            type: "selectize",
            options: function() {
                return [
                    {label: "USA", value: "USA"},
                    {label: "Ghana", value: "Ghana"},
                    {label: "UK", value: "UK"}
                ];
            }

        }
        
    },
    choose_date: {
        type: Date,
        autoform: {
            omit: true
        }
    }
});
