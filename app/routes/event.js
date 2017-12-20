import event from "../models/event";

export default (route) => {
    route.get('/events', (req, res) => {
        req.$models.event.findAll()
            .then(events => res.json(events || []))
            .catch(error => res.status(400).send(error));
    })
    route.get('/events/:id', (req, res) => {
        req.$models.event.findById(req.params.id)
            .then(event => {
                if (!event) return notFound(res);
                return res.json(event)
            })
            .catch(error => res.status(400).send(error));
    })

    route.put('/events/:id', (req, res) => {
        req.$models.event.findById(req.params.id)
            .then(event => {
                if (!event) return notFound(res);
                req.body.id = req.params.id;
                return event.update({
                        startDate: req.body.startDate || event.startDate,
                        endDate: req.body.endDate || event.endDate,
                        description: req.body.description || event.description,
                        name: req.body.name || event.name
                    })
                    .then(newEvent => res.status(200).send(newEvent))
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error));
    })

    route.delete('/events/:id', (req, res) => {
        req.$models.event.findById(req.params.id)
            .then(event => {
                if (!event) return notFound(res);
                return event.destroy()
                    .then((event) => res.status(200).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    })

    route.post('/events', (req, res) => {
        req.$models.event.create({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description,
            name: req.body.name
        }).then((event) => {
            res.json(event);
        }).catch(error => res.status(400).send(error));
    })

    function notFound(res) {
        return res.status(404).send({
            message: 'Event Not Found'
        })
    }

    return route;
}