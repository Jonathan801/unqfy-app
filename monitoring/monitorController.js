const errorsAPI = require("../exceptions/apiExeptions");
const Monitor = require('./monitor')
const monitor = new Monitor.Monitor()


function status(req, res) {
    let res = []
    monitor.getServices().forEach(service => {
        res.push(monitor.isAlive(service))
    })

    monitor.getStatusServices(res).then(status => {
        res.json({
            message: `All services are active`,
            status: status
        })
    }).catch(error => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    })
}

function isAlive(req, res, monitoring = true) {
    if (monitoring) {
        monitor.getServices().forEach(service => {
            monitor.isAlive(service).then(ping => {
                if(!ping) {
                    monitor.notifyDiscord(service, ping)
                }
                res.json({
                    message: `The ${service.displayName} service is OK`,
                    status: ping
                })
            }).catch(error => {
                if (error) {
                    res.status(error.status);
                    res.json({status: error.status, errorCode: error.errorCode});
                }
            })
        })
    }
}

function deactive(req, res) {
    const body = req.body;
    this.isAlive(req, res, body.monitoring).then(() => {
        res.json({
            message: `Disable periodic monitoring`
        })
    })
}

function active(req, res) {
    const body = req.body;
    this.isAlive(req, res, body.monitoring).then(() => {
        res.json({
            message: `Enable periodic monitoring`
        })
    })
}

module.exports = {
    status,
    isAlive,
    deactive,
    active
};