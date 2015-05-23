Schema = {};
Schema.profile = new SimpleSchema({
    first_name: {
        type: String,
        label: "First Name",
    },
    last_name: {
        type: String,
        label: "Last Name"
    },
    country: {
        type: String,
        label: "Choose country",
        autoform: {
            type: "select2",
            options: function() {
                return [
                    {label: "USA", value: "USA"},
                    {label: "UK", value: "UK"}
                ];
            }
        }
    },
    city: {
        type: String,
        label: "Choose city",
        autoform: {
            type: "select2",
            options: function() {
                return [
                    {label: "New York", value: "New York"},
                    {label: "London", value: "London"}
                ];
            }
        }

    },
    month: {
        type: String,
        autoform: {
            type: "select2",
            placeholder: "Select Month",
            options: function() {
                return [
                    {label: "Jan", value: "Jan"},
                    {label: "Feb", value: "Feb"},
                    {label: "Mar", value: "Mar"},
                    {label: "Apr", value: "Apr"},
                    {label: "May", value: "May"},
                    {label: "Jun", value: "Jun"},
                    {label: "Jul", value: "Jul"},
                    {label: "Aug", value: "Aug"},
                    {label: "Sep", value: "Sep"},
                    {label: "Oct", value: "Oct"},
                    {label: "Nov", value: "Nov"},
                    {label: "Dec", value: "Dec"}
                ];
            }
        }
    },
    day: {
        type: Number,
        autoform: {
         type: "select2",
         options: function() {
            return [
                {label: "01", value: "01"},
                {label: "02", value: "02"},
                {label: "03", value: "03"},
                {label: "04", value: "04"},
                {label: "05", value: "05"},
                {label: "06", value: "06"},
                {label: "07", value: "08"},
                {label: "09", value: "09"},
                {label: "10", value: "10"},
                {label: "11", value: "11"},
                {label: "12", value: "12"},
                {label: "13", value: "13"},
                {label: "14", value: "14"},
                {label: "15", value: "15"},
                {label: "16", value: "16"},
                {label: "17", value: "17"},
                {label: "18", value: "18"},
                {label: "19", value: "19"},
                {label: "20", value: "20"},
                {label: "21", value: "21"},
                {label: "22", value: "22"},
                {label: "23", value: "23"},
                {label: "24", value: "24"},
                {label: "25", value: "25"},
                {label: "26", value: "26"},
                {label: "27", value: "27"},
                {label: "28", value: "28"},
                {label: "30", value: "30"},
                {label: "31", value: "31"},

            ];
         }
        }
    },
    year: {
        type: Number,
        autoform: {
             type: "select2",
             options: function() {
                return [
                    {label: "1935", value: 1935},
                    {label: "1936", value: 1936},
                    {label: "1937", value: 1937},
                    {label: "1938", value: 1938},
                    {label: "1939", value: 1939},
                    {label: "1940", value: 1940},
                    {label: "1941", value: 1941},
                ];
             }
        }
    }
});