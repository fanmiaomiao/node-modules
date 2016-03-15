/**
 * Created by miaomiao on 2016/3/15.
 */
function Controller(router) {
    router.get('/', function(req, res) {
        res.render('index',{
            title:'httpCommand'
        });
    });
};
module.exports = Controller;
