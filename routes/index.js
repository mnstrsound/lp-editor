import Router from 'koa-router';
import fs from "fs";

const router = new Router();

router.get('/', async ctx => {
    let template = fs.readFileSync('./admin/backups/template1.json', {encoding: 'utf8'});
    await ctx.render('admin/index', {template})
});

export default router;