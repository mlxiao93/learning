declare namespace MiniReact { 
  type InputEvent = React.ChangeEvent<HTMLInputElement>;

  type ElementType = 'TEXT_ELEMENT' | keyof HTMLElementTagNameMap;
  type ElementProps = React.PropsWithChildren;

  interface ReactElement {
    type: ElementType,
    props: {
      children?: ReactElement[]
      [key: string]: any
    },
  };

  interface Fiber { 
    child?: Fiber
    sibling?: Fiber
    parent?: Fiber

    type?: ElementType
    dom?: HTMLElement | Text

    effectTag?: 'PLACEMENT' | 'DELETION' | 'UPDATE'

    props: {
      children?: ReactElement[],
      [key: string]: any
    },

    alternate?: Fiber
  }
}
