const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesServices = require('./services/inMemory/NotesServices');

const init = async () => {
    const notesService = new NotesServices();
    const server = Hapi.server({
        port:5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: notes,
        option: {
            service: notesService,
        }
    })

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();