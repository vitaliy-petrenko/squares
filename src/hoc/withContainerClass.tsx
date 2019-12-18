import React from 'react'

interface IHocProps {
}

const withContainerClass = <P extends object>(Component: React.ComponentType<P>, selector: string, className: string) => {
  class WithContainerClass extends React.Component<P & IHocProps> {
    componentDidMount(): void {
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

    shouldComponentUpdate(): boolean {
      return false
    }

    render = () => <Component {...this.props as P} />
  }

  return WithContainerClass
}

export default withContainerClass
