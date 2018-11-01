import Scroller, {
  ScrollerObserver,
  ScrollerState,
  ScrollAxis,
  ScrollDirection,
  ScrollYDirection,
  ScrollXDirection,
} from '../src/scroller';

export default class Debugger implements ScrollerObserver {
  scroller: Scroller;
  el: HTMLElement;
  state!: ScrollerState;
  isPending!: boolean;
  isReady!: boolean;
  isRunning!: boolean;
  isDestroyed!: boolean;
  containerWidth!: number;
  containerHeight!: number;
  scrollWidth!: number;
  scrollHeight!: number;
  scrollTop!: number;
  scrollRight!: number;
  scrollBottom!: number;
  scrollLeft!: number;
  lastAxis!: ScrollAxis;
  lastDirection!: ScrollDirection;
  lastYDirection!: ScrollYDirection;
  lastXDirection!: ScrollXDirection;
  nowScrolling!: boolean;

  constructor(
    scroller: Scroller,
    parent: Element = document.body,
    injectStyles?: Partial<CSSStyleDeclaration>,
  ) {
    const self = <any>this;

    this.scroller = scroller;

    this.el = document.createElement('div');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    this.el.appendChild(table);
    table.appendChild(tbody);
    for (const key of Scroller.scrollerObservableKeys) {
      const row = document.createElement('tr');
      const th = document.createElement('tr');
      th.innerText = key;
      const td = document.createElement('td');
      row.appendChild(th);
      row.appendChild(td);

      Object.defineProperty(self, key, {
        enumerable: true,
        configurable: true,
        get: () => {
          return self['_' + key];
        },
        set: (val: any) => {
          self['_' + key] = val;
          td.innerText = val;
        },
      });
      tbody.appendChild(row);
    }
    scroller.observe(this);
    const styles: Partial<CSSStyleDeclaration> = {
      zIndex: '32767',
      position: 'fixed',
      right: '0',
      top: '0',
      background: 'rgba(0, 0, 0, .5)',
      color: '#fff',
      fontSize: '10px',
      ...injectStyles,
    };

    for (const key in styles) {
      this.el.style[key] = styles[key] as string;
    }
    parent.appendChild(this.el);
  }
}
