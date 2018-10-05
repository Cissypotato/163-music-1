







// var GuangZhou = new AV.Object('City');// 广州
//     GuangZhou.set('name', '广州');
//     var GuangDong = new AV.Object('Province');// 广东
//     GuangDong.set('name', '广东');
//     GuangZhou.set('dependent', GuangDong);// 为广州设置 dependent 属性为广东
//     GuangZhou.save().then(function (guangZhou) {
//         console.log(guangZhou.id);
//     });

//     var ChengDu = new AV.Object('City');// 成都
//     ChengDu.set('name', '成都');

//     var SiChuan = new AV.Object('Province');//四川
//     SiChuan.set('name', '四川');

//     ChengDu.set('dependent', SiChuan);// 为成都设置 dependent 属性为四川
//     ChengDu.save().then(function (chengdu) {
//         console.log(chengdu.id);
//     });


    //要关联一个已经存在于云端的对象，例如将「东莞市」添加至「广东省」，方法如下：


    // 假设 GuangDong 的 objectId 为 56545c5b00b09f857a603632
    // var GuangDong = AV.Object.createWithoutData('Province', '56545c5b00b09f857a603632');
    // var DongGuan = new AV.Object('City');
    // DongGuan.set('name', '东莞');
    // DongGuan.set('dependent', GuangDong);
    // DongGuan.save();