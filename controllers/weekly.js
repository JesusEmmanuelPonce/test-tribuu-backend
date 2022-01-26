const { addDaysToDate } = require("../helpers/addDaysToDate");
const Weekly = require("../models/weekly");

exports.saveDate = async(req, res) => {
    
    try {

        const weekly = new Weekly();

        await weekly.save();

        res.status(200).json({
            success: true,
            msg: "Fecha agregada"
        })
    } catch (error) {
        console.log("Save a date", error);
        res.status(500).json({
            success: false,
            msg: "Error inesperado, intente de nuevo"
        })
    }
}

exports.getDays = async(req, res) => {

    const { week } = req.query;
    const weekQuery = parseInt(week) || 1;

    try {

        const dateDB = await Weekly.find().limit(1).sort({ $natural: -1 });

        if(!dateDB) {
            return res.status(400).json({
                success: false,
                msg: "No hay fechas disponibles, creé una consulta"
            })
        }

        const date = dateDB[0].initDay;
        const idDate = dateDB[0]._id;

        const indexDay = date.getDay();

        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const currentWeek = days.slice(indexDay - 1, days.length);
        const diffWeek = ((days.length - currentWeek.length) + 1);

        const calcWeek = (((weekQuery * 7) - 6) - diffWeek);
        
        let dayOfWeek = [];
        let weekUpdate = {};

        if(weekQuery === 1) {

            for(let i = 0; i < currentWeek.length; i++) {
                dayOfWeek.push(addDaysToDate(date, i))
            }

            weekUpdate = {
                lastDay: dayOfWeek[0],
            }

        } else if (weekQuery > 1) {
            const dateWeek = new Date(date.setDate(date.getDate() + calcWeek))

            for (let i = 0; i < 7; i++) {
                dayOfWeek.push(addDaysToDate(dateWeek, i))
            }

            weekUpdate = {
                lastDay: dayOfWeek[0],
            }
        }
        
        await Weekly.findByIdAndUpdate(idDate, weekUpdate, { new: true });
        
        res.status(200).json({
            success: true,
            initDay: date,
            dayOfWeek,
            weekQuery
        });


    } catch (error) {
        console.log("[weekly]", error);
        res.status(500).json({
            success: false,
            msg: "Error inesperado, intente de nuevo"
        });
    }
}
