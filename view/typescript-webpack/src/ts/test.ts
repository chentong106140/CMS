//import {jQuery as $} from '@types/jquery'

export function jq(selector:string):any {
    console.log($(selector));
}

export var jq2 = function (callback : () => any):any {
    $(function () {
      console.log('a',this);
      console.log('b',window);
      callback && callback();
  }); 
};

