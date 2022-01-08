function getByClass(node, classname){
  if (node.getElementsByClassName){
    return node.getElementsByClassName(classname);
  } else {
    var elems = node.getElementsByTagName("*"),
        results = new Array();
    if (elems[i].className.indexOf(classname) != -1){
      results[results.length] = elems[i];
    }
      return results;
  }
}



var list = getByClass(document, "list");
console.log(list);



