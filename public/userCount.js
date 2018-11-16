const define = window.customElements.define.bind(window.customElements);

const DEFAULTS = {
  observedAttributes() {
    return [];
  }
};

window.registerCustomElements = () => {
  const tag = "user-count";
  console.log("registering custom element: ", tag);

  const store = { propsMap: new Map() };

  class UserCount extends HTMLElement {
    constructor() {
      super();
      this.tag = tag;
      this.uid = Symbol(tag);
      store.propsMap.set(this.uid, this.defaultProps);

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = this.render();
    }

    get defaultProps() {
      return { users: [], max: 5 };
    }

    get props() {
      const currentProps = store.propsMap.get(this.uid);

      return Object.keys(this.defaultProps).reduce((final, name) => {
        final[name] = currentProps[name] || this.defaultProps[name];
        return final;
      }, {});
    }

    set props(props) {
      store.propsMap.set(this.uid, props);
      this.render();
    }

    static get observedAttributes() {
      return ["users", "max"];
    }

    connectedCallback() {
      return console.log("connected user-count");
    }

    render() {
      this.shadowRoot.innerHTML = `
        <div>user count ${this.props.users.length}</div>
      `;
    }
  }

  define(tag, UserCount);
};
