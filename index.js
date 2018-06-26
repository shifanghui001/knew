

var file = document.getElementById("file");  
var ul = document.querySelector(".upload-box");
var fileName = document.querySelector(".upload-file-name");  
var fileCountele = document.querySelectorAll(".file-count");  
var del = document.querySelector(".del");  
var tablePan = document.querySelector(".verify-table tbody"); 
var submit = document.querySelector(".submit"); 

// 上传文件
file.onchange = function (e) {
    fileObj.createFile(this.files);
}


ul.onclick = function (e) {
    if(e.target.className == 'del') {
        //  删除按钮
        // todo
        var parentLi = e.target.parentNode.parentNode.parentNode;
        ul.removeChild(parentLi);
    }
}

submit.onclick = function () {
    // 提交验证
    if(confirm('确认提交')) {
        alert('提交成功');
    }
}

var fileObj = {
    fileCount: 0,
    // 循环文件列表
    createFile: function (files) {
        var tarName;
        for(var tem of files) {
            tarName = tem.name;
            var li = this.createLi('li', tarName);
            ul.appendChild(li);
            this.fileCount++;
            var that = this;
            fileCountele.forEach(function (e) {
                e.innerHTML = that.fileCount;
            })
        }
    },
    createLi : function (html, value) {
        var html = document.createElement(html);
        var uploadImg = document.createElement('div');
        uploadImg.className = 'upload-img';
        uploadImg.innerHTML = '缩略图';

        var uploadDetail = document.createElement('div');
        uploadDetail.className = 'upload-detail';

        var uploadFileSec = document.createElement('div');
        uploadFileSec.className = 'upload-file-sec';

        var uploadFileName = document.createElement('p');
        uploadFileName.className = 'upload-file-name';
        uploadFileName.innerHTML = value;

        var del = document.createElement('p');
        del.className = 'del';
        del.innerHTML = 'X';

        var progress = document.createElement('progress');
        progress.className = 'processbar';
        progress.setAttribute('max', 100);
        progress.setAttribute('value', 5);
        this.stepprocessbar(progress, value);

        uploadFileSec.appendChild(uploadFileName);
        uploadFileSec.appendChild(del);

        uploadDetail.appendChild(uploadFileSec);
        uploadDetail.appendChild(uploadFileSec);
        uploadDetail.appendChild(progress);

        html.appendChild(uploadImg);
        html.appendChild(uploadDetail);
        return html;
    },
    createTableLine : function (value, orderNo, policyNo, verifyType) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');

        var uploadImg = document.createElement('div');
        uploadImg.className = 'upload-img';
        uploadImg.innerHTML = '缩略图';
        
        var spanNode = document.createElement('span');
        spanNode.innerHTML = value;
        td1.appendChild(uploadImg);
        td1.appendChild(spanNode);

        var td2 = document.createElement('td');
        td2.innerHTML = orderNo;

        var td3 = document.createElement('td');
        td3.innerHTML = policyNo;

        var td4 = document.createElement('td');
        td4.innerHTML = verifyType == 'success' ? '验证成功' : '验证失败';
        td4.setAttribute('data-type', verifyType);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        return tr;
    }, 
    // 进度条
    stepprocessbar: function (ele, tarName) {
        ele.value = ele.value + 1;
        var _this = this, trHtml;
    　　if (ele.value < 100) {
    　　　　setTimeout(function () {
        　　    _this.stepprocessbar(ele, tarName);
    　　　　}, 5)
    　　} else {
            trHtml = this.createTableLine(tarName, '订单号', '保单号', 'success');
            tablePan.appendChild(trHtml);
        }
    }
}
