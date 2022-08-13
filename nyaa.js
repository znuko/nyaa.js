document.addEventListener("DOMContentLoaded", function(event) {

  // html要素の中身を取得
  const selector = 'html';
  let target = document.querySelector(selector).innerHTML;

  // assignタグから変数格納
  let dic = {};
  let tag_assign = new RegExp(/{%\s*assign\s+(?<key>\w+)\s*=\s*'?"?(?<value>.+?)'?"?\s*%}/g);
  let match;
  while ((match = tag_assign.exec(target)) != null) {
    dic[match.groups.key] = match.groups.value;
  }

  // 格納した変数をコンソール出力
  console.log(dic);

  // 変数展開
  for (let key in dic) {
    let value_expression = new RegExp('{{\\s*' + key + '\\s*}}' ,'g');
    target = target.replace(value_expression, dic[key]);
    document.querySelector(selector).innerHTML = target;
  }

  // タグの削除
  target = target.replace(/{%.*?%}/g, '');
  target = target.replace(/{{.*?}}/g, '');
  document.querySelector(selector).innerHTML = target;

});
