const rp = require('request-promise');
const ping = require('ping')
const errorsApi = require("../exceptions/apiExeptions");
const moment = require('moment')

class Monitor {
    constructor() {
        this.services = []
    }

    getServices() {
        return this.services
    }

    isAlive(service) {
        // { port: 12346, family: 'IPv4', address: '127.0.0.1' }
        let host = service.address()
        let info = ''
        let status = true

        ping.sys.probe(host, function (active) {
            info = active ? `IP ${host} = Alive` : `IP ${host} = Non-Active`
            status = active
            console.log(info)
        })
        return {info: info, status: status}
    }

    getStatusServices(results) {
        return results.every(result => result.status === true)
    }

    notifyDiscord(service, ping) {
        const token = `rutbSmXZUljPxjc7R3jOZq9wAO1sOogLr-nt_Po91183LKJX8JIGJSyaxYlexYZmMZrW`
        const channel_id = '907744829943984198'

        /**
         * Default Message
         * "[HORA DEL INCIDENTE] El servicio X ha dejado de funcionar"
         * "[HORA DEL INCIDENTE] El servicio X ha vuelto a la normalidad"
         */

        let today = new Date(Date.now)
        let timeLocal = moment(today, "DD MM YYYY hh:mm:ss")

        const options = {
            url: `https://discord.com/api/webhooks/${channel_id}/${token}`,
            body: {
                content: `[${timeLocal}] ${service.name} service has stopped working`,
            },
            json: true,
        };

        rp.post(options)
        .catch(() => {
            throw new errorsApi.InternalServerError();
        });
    }
}

module.exports = {
    Monitor: Monitor
};