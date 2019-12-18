import React from 'react'

interface IHocProps {
}

const withContainerClass = <P extends object>(Component: React.ComponentType<P>, selector: string, className: string) => {
  class HocComponent extends React.Component<P & IHocProps> {
    constructor(props: P & IHocProps) {
      super(props)

      const element = this.element

      element && element.classList.add(className)
    }

    get element(): Element | null {
      const
        element = document.querySelector(selector)

      return element || null
    }

    componentWillUnmount(): void {
      const element = this.element

      element && element.classList.remove(className)
    }

    render() {
      return (
        <Component {...this.props as P} />
      )
    }
  }

  return HocComponent
}

export default withContainerClass
