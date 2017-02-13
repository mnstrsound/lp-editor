import Router from 'koa-router';
import fs from "fs";
import PageCreator from "../server/PageCreator";

const router = new Router();

router.get('/', async ctx => {
    let template = fs.readFileSync('./admin/backups/template1.json', {encoding: 'utf8'});
    await ctx.render('admin/index', {template})
});

router.post('/api', ctx => {
    fs.writeFileSync('index.html', new PageCreator(ctx.request.body.data).makeMarkup(), 'utf8', function (err) {
       if (err) {
           console.log(err);
       }
    });
    ctx.body = 'index.html';
});

export default router;