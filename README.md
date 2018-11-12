# dd-scroller

DOM要素（DocumentElement含む）のスクロール情報を検知したり、スムーススクロールさせるためのクラスモジュールです。  
ブラウザJS、Node.jsの両環境でユニバーサルに動作します。（Node.js上では処理がキャンセルされます）  
そのためSPAサービス等にそのまま組み込んで利用する事が可能です。  
また、TypeScriptの型情報を併せ持つため、TypeScriptプロジェクトにおいて型情報を利用したコーディングが可能です。

[docs](https://dadajam4.github.io/dd-scroller/classes/_scroller_.scroller.html)

[See the demo](https://dadajam4.github.io/dd-scroller/playground/)

## インストール
```
npm install dd-scroller --save
```

## Polyfill
本モジュールは[ResizeObserver](https://wicg.github.io/ResizeObserver/)を利用します。未対応ブラウザにおいては[resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill)の利用をお勧めします。

### JavaScript
```JavaScript
import ResizeObserver from 'resize-observer-polyfill';
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}
```

### TypeScript
```TypeScript
import ResizeObserver from 'resize-observer-polyfill';
if (typeof window !== 'undefined' && !(window as any).ResizeObserver) {
  (window as any).ResizeObserver = ResizeObserver;
}
```

## 使い方

### ducument.scrollingElementにシンプルに適用
```JavaScript
import Scroller from 'dd-scroller';

// Elementを未指定、かつブラウザ上である場合は
// ducument.scrollingElement が自動設定されます。
const scroller = new Scroller();
scroller.on('scrollEnd', e => {
  console.log(e.totalAmmount);
});
```

### Vueインスタンスでの利用例

```JavaScript
SomeVueComponent = Vue.extend({
  data() {
    return {
      innerScrollTop: 0,
      // ...and more observable keys
    }
  },

  computed: {
    scrollTop: {
      get() { return this.innerScrollTop },
      set(scrollTop) {
        this.innerScrollTop = scrollTop;
        // >>> some actions...
      },
    },
    // ...and more observable keys
  },
  
  methods: {
    toElement(queryString) {
      this._scroller.toElement(queryString);
    },
  },

  created() {
    this._scroller = new Scroller(this.$el);
    this._scroller.observe(this);
  },
  
  beforeDestroy() {
    this._scroller.destroy();
    delete this._scroller;
  },
});
```