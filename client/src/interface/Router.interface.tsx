import React from "react"

export interface MainRouter {
    [x: string]: any
    name?: string
    path?: string
    header?: string
    component?: any
    pathHeader?: string
    icon?: React.ReactElement | null
    children?: IChildrenRouter[]
    // children:MainRouter[]
}

export interface IChildrenRouter extends MainRouter {
    subpath?: boolean
}