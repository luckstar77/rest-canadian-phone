const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');

app.use(async ctx => {
    let result = [];
    let dirFiles = fs.readdirSync(path.join(__dirname, `asserts`));

    dirFiles.map((file)=>{
        let filePath = path.join(__dirname, `asserts/${file}`);
        result.push(fs.readFileSync(filePath, {encoding:'utf8'}).split('\n').map((csv) => {
            let [npa, co, company, ocn, status, centre, remarks] = csv.split(',');
            
            return {
                npa, 
                co, 
                company, 
                ocn, 
                status, 
                centre, 
                remarks
            }
        }));
    });

    ctx.body = result;
});

app.listen(3000);