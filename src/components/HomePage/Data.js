var today = new Date();

const Datas = {
    1: [
        {
            data: new Date(),
            status: "status",
            statusB: "Admission Start",
            statusE: "Admission Open"
        },
        {
            data: new Date().setMinutes(today.getMinutes() - 5),
            status: "status",
            statusB: "Start 1st round",
            statusE: "Open for Fillup"
        },
        {
            data: new Date().setMinutes(today.getMinutes() - 10),
            status: "status",
            statusB: "Start 2nd round",
            statusE: "process"
        },
        {
            data: new Date().setMinutes(today.getMinutes() - 15),
            status: "status",
            statusB: "Start 3rd round",
            statusE: "Done"
        },
        {
            data: new Date().setMinutes(today.getMinutes() - 20),
            status: "status",
            statusB: "Admission Start",
            statusE: "Admission Open"
        },

        {
            data: new Date().setMinutes(today.getMinutes() - 25),
            status: "status",
            statusB: "Start 2nd round",
            statusE: "process"
        },
        {
            data: new Date().setMinutes(today.getMinutes() - 30),
            status: "status",
            statusB: "Start 3rd round",
            statusE: "Done"
        },
        {
            data: new Date().setMinutes(today.getMinutes() - 35),
            status: "status",
            statusB: "Start 1st round",
            statusE: "Open for Fillup"
        }

        // {
        //   data: "2020-04-19",
        //   status: "status",
        //   statusB: "Start 4th round",
        //   statusE: "Done"
        // },
        // {
        //   data: "2020-05-23",
        //   status: "status",
        //   statusB: "Complete",
        //   statusE: "Done"
        // }
    ],
    2: [
        {
            data: new Date(),
            status: "status",
            statusB: "Admission Start",
            statusE: "Admission Open"
        },
        {
            data: new Date().setHours(today.getHours() - 1),
            status: "status",
            statusB: "Start 1st round",
            statusE: "Open for Fillup"
        },
        {
            data: new Date().setHours(today.getHours() - 2),
            status: "status",
            statusB: "Start 2nd round",
            statusE: "process"
        },
        {
            data: new Date().setHours(today.getHours() - 3),
            status: "status",
            statusB: "Start 3rd round",
            statusE: "Done"
        }
    ],
    3: [
        {
            data: new Date(),
            status: "status",
            statusB: "Admission Start",
            statusE: "Admission Open"
        },
        {
            data: new Date().setDate(today.getDate() - 1),
            status: "status",
            statusB: "Start 1st round",
            statusE: "Open for Fillup"
        },
        {
            data: new Date().setDate(today.getDate() - 2),
            status: "status",
            statusB: "Start 2nd round",
            statusE: "process"
        },
        {
            data: new Date().setDate(today.getDate() - 3),
            status: "status",
            statusB: "Start 3rd round",
            statusE: "Done"
        }
    ],
    4: [
        {
            data: new Date(),
            status: "status",
            statusB: "Admission Start",
            statusE: "Admission Open"
        },
        {
            data: new Date().setDate(today.getDate() - 7),
            status: "status",
            statusB: "Start 1st round",
            statusE: "Open for Fillup"
        },
        {
            data: new Date().setDate(today.getDate() - 14),
            status: "status",
            statusB: "Start 2nd round",
            statusE: "process"
        },
        {
            data: new Date().setDate(today.getDate() - 21),
            status: "status",
            statusB: "Start 3rd round",
            statusE: "Done"
        }
    ]
};

export default Datas