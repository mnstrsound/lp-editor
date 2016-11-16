import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import indexRouter from './routes';

const port = 3000;
const app = new Koa();

app.use(serve('.'));
app.use(serve('admin'));

app.use(bodyParser());
app.use(views(__dirname + '/views', { extension: 'jade' }));
app
    .use(indexRouter.routes())
    .use(indexRouter.allowedMethods());

app.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
});

export default app