export type UploadSummary = {
    id: string
    fileName: string
    size: number
    timestamp: string,
    numberOfModules: number
    numberOfRules: number
    numberOfFeatures: number
    hasBooleanFeatures: boolean
    hasEnumFeatures: boolean
    hasIntFeatures: boolean
    slicingProperties: SlicingProperty[]
    features: FeatureName[]

    errors: string[]
    warnings: string[]
    infos: string[]
}

export type SlicingProperty = {
    name: string
    type: PropertyType
    range: PropertyRange
}

export type FeatureName = {
    uniqueName: string
    fullName: string
}

export type PropertyRange = {
    booleanValues?: boolean[]
    enumValues?: string[]
    intValues?: number[]
    intMin?: number
    intMax?: number
    dateValues?: string[]
    dateMin?: string
    dateMax?: string
}

export type PropertySelection = {
    property: string
    propertyType: PropertyType
    range: PropertyRange
    sliceType: SliceType
}

export type SliceType = 'ALL' | 'ANY' | 'SPLIT'

export type PropertyType = 'BOOLEAN' | 'INT' | 'ENUM' | 'DATE'

export type FeatureType = 'BOOLEAN' | 'VERSIONED_BOOLEAN' | 'ENUM' | 'INT'

export type Feature = {
    code: string
    fullName: string
    type: FeatureType
    booleanValue?: boolean
    version?: number
    enumValue?: string
    intValue?: number
}

export type Rule = {
    rule: string,
    module?: string,
    id?: string,
    description?: string,
    lineNumber?: number,
    properties?: Property[]
}

export type Property = {
    property: string,
    value: string,
    slicing: boolean
}
