import babel from '@babel/core';
import { NodePath } from '@babel/traverse';
import { types } from '@appfibre/jst';
/*
const ref = { types: babel.types, template: babel.template, traverse: babel.traverse };
export {ref};*/


export interface IEmitPluginArgs {
    name?: string
}

export interface IParsers {
    [key: string]: (this:any, _ref: ref, path:NodePath<babel.types.ObjectProperty>, name?:string) => babel.types.Node 
}

export interface ITransformPluginArgs {
	name?: string
    parsers: IParsers    
}

export interface ILoaderPluginArgs extends types.ITransformSettings {
	name?:string
	, forceBabel?:boolean
}

export interface ref {
    types: {
          ArrayExpression: babel.types.ArrayExpression
        , AssignmentExpression: babel.types.AssignmentExpression
        , BinaryExpression: babel.types.BinaryExpression
        , InterpreterDirective: babel.types.InterpreterDirective
        , Directive: babel.types.Directive
        , DirectiveLiteral: babel.types.DirectiveLiteral
        , BlockStatement: babel.types.BlockStatement
        , BreakStatement: babel.types.BreakStatement
        , CallExpression: babel.types.CallExpression
        , CatchClause: babel.types.CatchClause
        , ConditionalExpression: babel.types.ConditionalExpression
        , ContinueStatement: babel.types.ContinueStatement
        , DebuggerStatement: babel.types.DebuggerStatement
        , DoWhileStatement: babel.types.DoWhileStatement
        , EmptyStatement: babel.types.EmptyStatement
        , ExpressionStatement: babel.types.ExpressionStatement
        , File: babel.types.File
        , ForInStatement: babel.types.ForInStatement
        , ForStatement: babel.types.ForStatement
        , FunctionDeclaration: babel.types.FunctionDeclaration
        , FunctionExpression: babel.types.FunctionExpression
        , Identifier: babel.types.Identifier
        , IfStatement: babel.types.IfStatement
        , LabeledStatement: babel.types.LabeledStatement
        , StringLiteral: babel.types.StringLiteral
        , NumericLiteral: babel.types.NumericLiteral
        , NullLiteral: babel.types.NullLiteral
        , BooleanLiteral: babel.types.BooleanLiteral
        , RegExpLiteral: babel.types.RegExpLiteral
        , LogicalExpression: babel.types.LogicalExpression
        //, MemberExpression: babel.types.MemberExpression
        , NewExpression: babel.types.NewExpression
        , Program: babel.types.Program
        , ObjectExpression: babel.types.ObjectExpression
        , ObjectMethod: babel.types.ObjectMethod
        , ObjectProperty: babel.types.ObjectProperty
        , RestElement: babel.types.RestElement
        , ReturnStatement: babel.types.ReturnStatement
        , SequenceExpression: babel.types.SequenceExpression
        , SwitchCase: babel.types.SwitchCase
        , SwitchStatement: babel.types.SwitchStatement
        , ThisExpression: babel.types.ThisExpression
        , ThrowStatement: babel.types.ThrowStatement
        , TryStatement: babel.types.TryStatement
        , UnaryExpression: babel.types.UnaryExpression
        , UpdateExpression: babel.types.UpdateExpression
        , VariableDeclaration: babel.types.VariableDeclaration
        , VariableDeclarator: babel.types.VariableDeclarator
        , WhileStatement: babel.types.WhileStatement
        , WithStatement: babel.types.WithStatement
        , AssignmentPattern: babel.types.AssignmentPattern
        , ArrayPattern: babel.types.ArrayPattern
        , ArrowFunctionExpression: babel.types.ArrowFunctionExpression
        , ClassBody: babel.types.ClassBody
        , ClassDeclaration: babel.types.ClassDeclaration
        , ClassExpression: babel.types.ClassExpression
        , ExportAllDeclaration: babel.types.ExportAllDeclaration
        , ExportDefaultDeclaration: babel.types.ExportDefaultDeclaration
        , ExportNamedDeclaration: babel.types.ExportNamedDeclaration
        , ExportSpecifier: babel.types.ExportSpecifier
        , ForOfStatement: babel.types.ForOfStatement
        , ImportDeclaration: babel.types.ImportDeclaration
        , ImportDefaultSpecifier: babel.types.ImportDefaultSpecifier
        , ImportNamespaceSpecifier: babel.types.ImportNamespaceSpecifier
        , ImportSpecifier: babel.types.ImportSpecifier
        , MetaProperty: babel.types.MetaProperty
        , ClassMethod: babel.types.ClassMethod
        , ObjectPattern: babel.types.ObjectPattern
        , SpreadElement: babel.types.SpreadElement
        , Super: babel.types.Super
        , TaggedTemplateExpression: babel.types.TaggedTemplateExpression
        , TemplateElement: babel.types.TemplateElement
        , TemplateLiteral: babel.types.TemplateLiteral
        , YieldExpression: babel.types.YieldExpression
        , AnyTypeAnnotation: babel.types.AnyTypeAnnotation
        , ArrayTypeAnnotation: babel.types.ArrayTypeAnnotation
        , BooleanTypeAnnotation: babel.types.BooleanTypeAnnotation
        , BooleanLiteralTypeAnnotation: babel.types.BooleanLiteralTypeAnnotation
        , NullLiteralTypeAnnotation: babel.types.NullLiteralTypeAnnotation
        , ClassImplements: babel.types.ClassImplements
        , DeclareClass: babel.types.DeclareClass
        , DeclareFunction: babel.types.DeclareFunction
        , DeclareInterface: babel.types.DeclareInterface
        , DeclareModule: babel.types.DeclareModule
        , DeclareModuleExports: babel.types.DeclareModuleExports
        , DeclareTypeAlias: babel.types.DeclareTypeAlias
        , DeclareOpaqueType: babel.types.DeclareOpaqueType
        , DeclareVariable: babel.types.DeclareVariable
        , DeclareExportDeclaration: babel.types.DeclareExportDeclaration
        , DeclareExportAllDeclaration: babel.types.DeclareExportAllDeclaration
        , DeclaredPredicate: babel.types.DeclaredPredicate
        , ExistsTypeAnnotation: babel.types.ExistsTypeAnnotation
        , FunctionTypeAnnotation: babel.types.FunctionTypeAnnotation
        , FunctionTypeParam: babel.types.FunctionTypeParam
        , GenericTypeAnnotation: babel.types.GenericTypeAnnotation
        , InferredPredicate: babel.types.InferredPredicate
        , InterfaceExtends: babel.types.InterfaceExtends
        , InterfaceDeclaration: babel.types.InterfaceDeclaration
        , InterfaceTypeAnnotation: babel.types.InterfaceTypeAnnotation
        , IntersectionTypeAnnotation: babel.types.IntersectionTypeAnnotation
        , MixedTypeAnnotation: babel.types.MixedTypeAnnotation
        , EmptyTypeAnnotation: babel.types.EmptyTypeAnnotation
        , NullableTypeAnnotation: babel.types.NullableTypeAnnotation
        , NumberLiteralTypeAnnotation: babel.types.NumberLiteralTypeAnnotation
        , NumberTypeAnnotation: babel.types.NumberTypeAnnotation
        , ObjectTypeAnnotation: babel.types.ObjectTypeAnnotation
        , ObjectTypeInternalSlot: babel.types.ObjectTypeInternalSlot
        , ObjectTypeCallProperty: babel.types.ObjectTypeCallProperty
        , ObjectTypeIndexer: babel.types.ObjectTypeAnnotation
        , ObjectTypeProperty: babel.types.ObjectTypeProperty
        , ObjectTypeSpreadProperty: babel.types.ObjectTypeSpreadProperty
        , OpaqueType: babel.types.OpaqueType
        , QualifiedTypeIdentifier: babel.types.QualifiedTypeIdentifier
        , StringLiteralTypeAnnotation: babel.types.StringLiteral
        , StringTypeAnnotation: babel.types.StringTypeAnnotation
        , ThisTypeAnnotation: babel.types.ThisTypeAnnotation
        , TupleTypeAnnotation: babel.types.TupleTypeAnnotation
        , TypeofTypeAnnotation: babel.types.TypeofTypeAnnotation
        , TypeAlias: babel.types.TypeAlias
        , TypeAnnotation: babel.types.TypeAnnotation
        , TypeCastExpression: babel.types.TypeCastExpression
        , TypeParameter: babel.types.TypeParameter
        , TypeParameterDeclaration: babel.types.TypeParameterDeclaration
        , TypeParameterInstantiation: babel.types.TypeParameterInstantiation
        , UnionTypeAnnotation: babel.types.UnionTypeAnnotation
        , Variance: babel.types.Variance
        , VoidTypeAnnotation: babel.types.VoidTypeAnnotation
        , JSXAttribute: babel.types.JSXAttribute
        , JSXClosingElement: babel.types.JSXClosingElement
        , JSXElement: babel.types.JSXElement
        , JSXEmptyExpression: babel.types.JSXEmptyExpression
        , JSXExpressionContainer: babel.types.JSXExpressionContainer
        , JSXSpreadChild: babel.types.JSXSpreadAttribute
        , JSXIdentifier: babel.types.JSXIdentifier
        , JSXMemberExpression: babel.types.JSXMemberExpression
        , JSXNamespacedName: babel.types.JSXNamespacedName
        , JSXOpeningElement: babel.types.JSXOpeningElement
        , JSXSpreadAttribute: babel.types.JSXSpreadAttribute
        , JSXText: babel.types.JSXText
        , JSXFragment: babel.types.JSXFragment
        , JSXOpeningFragment: babel.types.JSXOpeningElement
        , JSXClosingFragment: babel.types.JSXClosingElement
        , Noop: babel.types.Noop
        , ParenthesizedExpression: babel.types.ParenthesizedExpression
        , AwaitExpression: babel.types.AwaitExpression
        , BindExpression: babel.types.BindExpression
        , ClassProperty: babel.types.ClassProperty
        , OptionalMemberExpression: babel.types.OptionalMemberExpression
        , PipelineTopicExpression: babel.types.PipelineTopicExpression
        , PipelineBareFunction: babel.types.PipelineBareFunction
        , PipelinePrimaryTopicReference: babel.types.PipelinePrimaryTopicReference
        , OptionalCallExpression: babel.types.OptionalCallExpression
        , ClassPrivateProperty: babel.types.ClassPrivateProperty
        , ClassPrivateMethod: babel.types.ClassPrivateMethod
        , Import: babel.types.Import
        , Decorator: babel.types.Decorator
        , DoExpression: babel.types.DoExpression
        , ExportDefaultSpecifier: babel.types.ExportDefaultSpecifier
        , ExportNamespaceSpecifier: babel.types.ExportNamespaceSpecifier
        , PrivateName: babel.types.PrivateName
        , BigIntLiteral: babel.types.BigIntLiteral
        , TSParameterProperty: babel.types.TSParameterProperty
        , TSDeclareFunction: babel.types.TSDeclareFunction
        , TSDeclareMethod: babel.types.TSDeclareMethod
        , TSQualifiedName: babel.types.TSQualifiedName
        , TSCallSignatureDeclaration: babel.types.TSCallSignatureDeclaration
        , TSConstructSignatureDeclaration: babel.types.TSConstructSignatureDeclaration
        , TSPropertySignature: babel.types.TSPropertySignature
        , TSMethodSignature: babel.types.TSMethodSignature
        , TSIndexSignature: babel.types.TSIndexSignature
        , TSAnyKeyword: babel.types.TSAnyKeyword
        , TSUnknownKeyword: babel.types.TSUnknownKeyword
        , TSNumberKeyword: babel.types.TSNumberKeyword
        , TSObjectKeyword: babel.types.TSObjectKeyword
        , TSBooleanKeyword: babel.types.TSBooleanKeyword
        , TSStringKeyword: babel.types.TSStringKeyword
        , TSSymbolKeyword: babel.types.TSSymbolKeyword
        , TSVoidKeyword: babel.types.TSVoidKeyword
        , TSUndefinedKeyword: babel.types.TSUndefinedKeyword
        , TSNullKeyword: babel.types.TSNullKeyword
        , TSNeverKeyword: babel.types.TSNeverKeyword
        , TSThisType: babel.types.TSThisType
        , TSFunctionType: babel.types.TSFunctionType
        , TSConstructorType: babel.types.TSConstructorType
        , TSTypeReference: babel.types.TSTypeReference
        , TSTypePredicate: babel.types.TSTypePredicate
        , TSTypeQuery: babel.types.TSTypeQuery
        , TSTypeLiteral: babel.types.TSTypeLiteral
        , TSArrayType: babel.types.TSArrayType
        , TSTupleType: babel.types.TSTupleType
        , TSOptionalType: babel.types.TSOptionalType
        , TSRestType: babel.types.TSRestType
        , TSUnionType: babel.types.TSUnionType
        , TSIntersectionType: babel.types.TSIntersectionType
        , TSConditionalType: babel.types.TSConditionalType
        , TSInferType: babel.types.TSInferType
        , TSParenthesizedType: babel.types.TSParenthesizedType
        , TSTypeOperator: babel.types.TSTypeOperator
        , TSIndexedAccessType: babel.types.TSIndexedAccessType
        , TSMappedType: babel.types.TSMappedType
        , TSLiteralType: babel.types.TSLiteralType
        , TSExpressionWithTypeArguments: babel.types.TSExpressionWithTypeArguments
        , TSInterfaceDeclaration: babel.types.TSInterfaceDeclaration
        , TSInterfaceBody: babel.types.TSInterfaceBody
        , TSTypeAliasDeclaration: babel.types.TSTypeAliasDeclaration
        , TSAsExpression: babel.types.TSAsExpression
        , TSTypeAssertion: babel.types.TSTypeAssertion
        , TSEnumDeclaration: babel.types.TSEnumDeclaration
        , TSEnumMember: babel.types.TSEnumMember
        , TSModuleDeclaration: babel.types.TSModuleDeclaration
        , TSModuleBlock: babel.types.TSModuleBlock
        , TSImportType: babel.types.TSImportType
        , TSImportEqualsDeclaration: babel.types.TSImportEqualsDeclaration
        , TSExternalModuleReference: babel.types.TSExternalModuleReference
        , TSNonNullExpression: babel.types.TSNonNullExpression
        , TSExportAssignment: babel.types.TSExportAssignment
        , TSNamespaceExportDeclaration: babel.types.TSNamespaceExportDeclaration
        , TSTypeAnnotation: babel.types.TSTypeAnnotation
        , TSTypeParameterInstantiation: babel.types.TSTypeParameterInstantiation
        , TSTypeParameterDeclaration: babel.types.TSTypeParameterDeclaration
        , TSTypeParameter: babel.types.TSTypeParameter
        , NumberLiteral: babel.types.NumberLiteral
        , RegexLiteral: babel.types.RegexLiteral
        , RestProperty: babel.types.RestProperty
        , SpreadProperty: babel.types.SpreadProperty
        , Expression: babel.types.Expression
        , Binary: babel.types.Binary
        , Scopable: babel.types.Scopable
        , BlockParent: babel.types.BlockParent
        , Block: babel.types.Block
        , Statement: babel.types.Statement
        , Terminatorless: babel.types.Terminatorless
        , CompletionStatement: babel.types.CompletionStatement
        , Conditional: babel.types.Conditional
        , Loop: babel.types.Loop
        , While: babel.types.While
        , ExpressionWrapper: babel.types.ExpressionWrapper
        , For: babel.types.For
        , ForXStatement: babel.types.ForXStatement
        , Function: babel.types.Function
        , FunctionParent: babel.types.FunctionParent
        , Pureish: babel.types.Pureish
        , Declaration: babel.types.Declaration
        , PatternLike: babel.types.PatternLike
        , LVal: babel.types.LVal
        , TSEntityName: babel.types.TSEntityName
        , Literal: babel.types.Literal
        , Immutable: babel.types.Immutable
        , UserWhitespacable: babel.types.UserWhitespacable
        , Method: babel.types.Method
        , ObjectMember: babel.types.ObjectMember
        , Property: babel.types.Property
        , UnaryLike: babel.types.UnaryLike
        , Pattern: babel.types.Pattern
        , Class: babel.types.Class
        , ModuleDeclaration: babel.types.ModuleDeclaration
        , ModuleSpecifier: babel.types.ModuleSpecifier
        , Flow: babel.types.Flow
        , FlowType: babel.types.FlowType
        , FlowBaseAnnotation: babel.types.FlowBaseAnnotation
        , FlowDeclaration: babel.types.FlowDeclaration
        , FlowPredicate: babel.types.FlowPredicate
        , JSX: babel.types.JSX
        , Private: babel.types.Private
        , TSTypeElement: babel.types.TSTypeElement
        , TSType: babel.types.TSType
        , Aliases: babel.types.Aliases

        , assignmentExpression(operator: string, left: babel.types.LVal, right: babel.types.Expression): babel.types.AssignmentExpression
		, binaryExpression(operator: "+" | "-" | "/" | "%" | "*" | "**" | "&" | "|" | ">>" | ">>>" | "<<" | "^" | "==" | "===" | "!=" | "!==" | "in" | "instanceof" | ">" | "<" | ">=" | "<=", left: babel.types.Expression, right: babel.types.Expression): babel.types.BinaryExpression
		, interpreterDirective(value: string): babel.types.InterpreterDirective
		, directive(value: babel.types.DirectiveLiteral): babel.types.Directive
		, directiveLiteral(value: string): babel.types.DirectiveLiteral
		, blockStatement(body: Array<babel.types.Statement>, directives?: Array<babel.types.Directive>): babel.types.BlockStatement
		, breakStatement(label?: babel.types.Identifier | null): babel.types.BreakStatement
		, callExpression(callee: babel.types.Expression, _arguments: Array<babel.types.Expression | babel.types.SpreadElement | babel.types.JSXNamespacedName>, optional?: true | false | null, typeArguments?: babel.types.TypeParameterInstantiation | null, typeParameters?: babel.types.TSTypeParameterInstantiation | null): babel.types.CallExpression
		, catchClause(param: babel.types.Identifier | null | undefined, body: babel.types.BlockStatement): babel.types.CatchClause
		, conditionalExpression(test: babel.types.Expression, consequent: babel.types.Expression, alternate: babel.types.Expression): babel.types.ConditionalExpression
		, continueStatement(label?: babel.types.Identifier | null): babel.types.ContinueStatement
		, debuggerStatement(): babel.types.DebuggerStatement
		, doWhileStatement(test: babel.types.Expression, body: babel.types.Statement): babel.types.DoWhileStatement
		, emptyStatement(): babel.types.EmptyStatement
		, expressionStatement(expression: babel.types.Expression): babel.types.ExpressionStatement
		, file(program: babel.types.Program, comments: any, tokens: any): File
		, forInStatement(left: babel.types.VariableDeclaration | babel.types.LVal, right: babel.types.Expression, body: babel.types.Statement): babel.types.ForInStatement
		, forStatement(init: babel.types.VariableDeclaration | babel.types.Expression | null | undefined, test: babel.types.Expression | null | undefined, update: babel.types.Expression | null | undefined, body: babel.types.Statement): babel.types.ForStatement
		, functionDeclaration(id: babel.types.Identifier | null | undefined, params: Array<babel.types.Identifier | babel.types.Pattern | babel.types.RestElement | babel.types.TSParameterProperty>, body: babel.types.BlockStatement, generator?: boolean, async?: boolean, declare?: boolean | null, returnType?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null, typeParameters?: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null): babel.types.FunctionDeclaration
		, functionExpression(id: babel.types.Identifier | null | undefined, params: Array<babel.types.Identifier | babel.types.Pattern | babel.types.RestElement | babel.types.TSParameterProperty>, body: babel.types.BlockStatement, generator?: boolean, async?: boolean, returnType?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null, typeParameters?: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null): babel.types.FunctionExpression
		, identifier(name: string, decorators?: Array<babel.types.Decorator> | null, optional?: boolean | null, typeAnnotation?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null): babel.types.Identifier
		, ifStatement(test: babel.types.Expression, consequent: babel.types.Statement, alternate?: babel.types.Statement | null): babel.types.IfStatement
		, labeledStatement(label: babel.types.Identifier, body: babel.types.Statement): babel.types.LabeledStatement
		, stringLiteral(value: string): babel.types.StringLiteral
		, numericLiteral(value: number): babel.types.NumericLiteral
		, nullLiteral(): babel.types.NullLiteral
		, booleanLiteral(value: boolean): babel.types.BooleanLiteral
		, regExpLiteral(pattern: string, flags?: string): babel.types.RegExpLiteral
		, logicalExpression(operator: "||" | "&&" | "??", left: babel.types.Expression, right: babel.types.Expression): babel.types.LogicalExpression
		, memberExpression(object: babel.types.Expression, property: any, computed?: boolean, optional?: true | false | null): babel.types.MemberExpression
		, newExpression(callee: babel.types.Expression, _arguments: Array<babel.types.Expression | babel.types.SpreadElement | babel.types.JSXNamespacedName>, optional?: true | false | null, typeArguments?: babel.types.TypeParameterInstantiation | null, typeParameters?: babel.types.TSTypeParameterInstantiation | null): babel.types.NewExpression
		, program(body: Array<babel.types.Statement>, directives?: Array<babel.types.Directive>, sourceType?: "script" | "module", interpreter?: babel.types.InterpreterDirective | null, sourceFile?: string | null): babel.types.Program
		, objectExpression(properties: Array<babel.types.ObjectMethod | babel.types.ObjectProperty | babel.types.SpreadElement>): babel.types.ObjectExpression
		, objectMethod(kind: "method" | "get" | "set" | undefined, key: any, params: Array<babel.types.Identifier | babel.types.Pattern | babel.types.RestElement | babel.types.TSParameterProperty>, body: babel.types.BlockStatement, computed?: boolean, async?: boolean, decorators?: Array<babel.types.Decorator> | null, generator?: boolean, returnType?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null, typeParameters?: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null): babel.types.ObjectMethod
		, objectProperty(key: any, value: babel.types.Expression | babel.types.PatternLike, computed?: boolean, shorthand?: boolean, decorators?: Array<babel.types.Decorator> | null): babel.types.ObjectProperty
		//, RestElement(argument: LVal, decorators?: Array<Decorator> | null, typeAnnotation?: TypeAnnotation | TSTypeAnnotation | Noop | null): babel.types.RestElement
		, returnStatement(argument?: babel.types.Expression | null): babel.types.ReturnStatement
		, sequenceExpression(expressions: Array<babel.types.Expression>): babel.types.SequenceExpression
		, switchCase(test: babel.types.Expression | null | undefined, consequent: Array<babel.types.Statement>): babel.types.SwitchCase
		, switchStatement(discriminant: babel.types.Expression, cases: Array<babel.types.SwitchCase>): babel.types.SwitchStatement
		, thisExpression(): babel.types.ThisExpression
		, throwStatement(argument: babel.types.Expression): babel.types.ThrowStatement
		, tryStatement(block: babel.types.BlockStatement, handler?: babel.types.CatchClause | null, finalizer?: babel.types.BlockStatement | null): babel.types.TryStatement
		, unaryExpression(operator: "void" | "throw" | "delete" | "!" | "+" | "-" | "~" | "typeof", argument: babel.types.Expression, prefix?: boolean): babel.types.UnaryExpression
		, updateExpression(operator: "++" | "--", argument: babel.types.Expression, prefix?: boolean): babel.types.UpdateExpression
		, variableDeclaration(kind: "var" | "let" | "const", declarations: Array<babel.types.VariableDeclarator>, declare?: boolean | null): babel.types.VariableDeclaration
		, variableDeclarator(id: babel.types.LVal, init?: babel.types.Expression | null, definite?: boolean | null): babel.types.VariableDeclarator
		, whileStatement(test: babel.types.Expression, body: babel.types.BlockStatement | babel.types.Statement): babel.types.WhileStatement
		, withStatement(object: babel.types.Expression, body: babel.types.BlockStatement | babel.types.Statement): babel.types.WithStatement
		, assignmentPattern(left: babel.types.Identifier | babel.types.ObjectPattern | babel.types.ArrayPattern, right: babel.types.Expression, decorators?: Array<babel.types.Decorator> | null, typeAnnotation?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null): babel.types.AssignmentPattern
		, arrayPattern(elements: Array<babel.types.PatternLike>, decorators?: Array<babel.types.Decorator> | null, typeAnnotation?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null): babel.types.ArrayPattern
		, arrowFunctionExpression(params: Array<babel.types.Identifier | babel.types.Pattern | babel.types.RestElement | babel.types.TSParameterProperty>, body: babel.types.BlockStatement | babel.types.Expression, async?: boolean, Expression?: boolean | null, generator?: boolean, returnType?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null, typeParameters?: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null): babel.types.ArrowFunctionExpression
		, classBody(body: Array<babel.types.ClassMethod | babel.types.ClassPrivateMethod | babel.types.ClassProperty | babel.types.ClassPrivateProperty | babel.types.TSDeclareMethod | babel.types.TSIndexSignature>): babel.types.ClassBody
		, classDeclaration(id: babel.types.Identifier | null | undefined, superClass: babel.types.Expression | null | undefined, body: babel.types.ClassBody, decorators?: Array<babel.types.Decorator> | null, abstract?: boolean | null, declare?: boolean | null, _implements?: Array<babel.types.TSExpressionWithTypeArguments | babel.types.ClassImplements> | null, mixins?: any | null, superTypeParameters?: babel.types.TypeParameterInstantiation | babel.types.TSTypeParameterInstantiation | null, typeParameters?: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null): babel.types.ClassDeclaration
		, classExpression(id: babel.types.Identifier | null | undefined, superClass: babel.types.Expression | null | undefined, body: babel.types.ClassBody, decorators?: Array<babel.types.Decorator> | null, _implements?: Array<babel.types.TSExpressionWithTypeArguments | babel.types.ClassImplements> | null, mixins?: any | null, superTypeParameters?: babel.types.TypeParameterInstantiation | babel.types.TSTypeParameterInstantiation | null, typeParameters?: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null): babel.types.ClassExpression
		, exportAllDeclaration(source: babel.types.StringLiteral): babel.types.ExportAllDeclaration
		, exportDefaultDeclaration(declaration: babel.types.FunctionDeclaration | babel.types.TSDeclareFunction | babel.types.ClassDeclaration | babel.types.Expression): babel.types.ExportDefaultDeclaration
		, exportNamedDeclaration(declaration: babel.types.Declaration | null | undefined, specifiers: Array<babel.types.ExportSpecifier | babel.types.ExportDefaultSpecifier | babel.types.ExportNamespaceSpecifier>, source?: babel.types.StringLiteral | null): babel.types.ExportNamedDeclaration
		, exportSpecifier(local: babel.types.Identifier, exported: babel.types.Identifier): babel.types.ExportSpecifier
		, forOfStatement(left: babel.types.VariableDeclaration | babel.types.LVal, right: babel.types.Expression, body: babel.types.Statement, _await?: boolean): babel.types.ForOfStatement
		, importDeclaration(specifiers: Array<babel.types.ImportSpecifier | babel.types.ImportDefaultSpecifier | babel.types.ImportNamespaceSpecifier>, source: babel.types.StringLiteral, importKind?: "type" | "typeof" | "value" | null): babel.types.ImportDeclaration
		, importDefaultSpecifier(local: babel.types.Identifier): babel.types.ImportDefaultSpecifier
		, importNamespaceSpecifier(local: babel.types.Identifier): babel.types.ImportNamespaceSpecifier
		, importSpecifier(local: babel.types.Identifier, imported: babel.types.Identifier, importKind?: "type" | "typeof" | null): babel.types.ImportSpecifier
		, metaProperty(meta: babel.types.Identifier, property: babel.types.Identifier): babel.types.MetaProperty
		, classMethod(kind: "get" | "set" | "method" | "constructor" | undefined, key: babel.types.Identifier | babel.types.StringLiteral | babel.types.NumericLiteral | babel.types.Expression, params: Array<babel.types.Identifier | babel.types.Pattern | babel.types.RestElement | babel.types.TSParameterProperty>, body: babel.types.BlockStatement, computed?: boolean, _static?: boolean | null, abstract?: boolean | null, access?: "public" | "private" | "protected" | null, accessibility?: "public" | "private" | "protected" | null, async?: boolean, decorators?: Array<babel.types.Decorator> | null, generator?: boolean, optional?: boolean | null, returnType?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null, typeParameters?: babel.types.TypeParameterDeclaration | babel.types.TSTypeParameterDeclaration | babel.types.Noop | null): babel.types.ClassMethod
		, objectPattern(properties: Array<babel.types.RestElement | babel.types.ObjectProperty>, decorators?: Array<babel.types.Decorator> | null, typeAnnotation?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null): babel.types.ObjectPattern
		, spreadElement(argument: babel.types.Expression): babel.types.SpreadElement
		, taggedTemplateExpression(tag: babel.types.Expression, quasi: babel.types.TemplateLiteral, typeParameters?: babel.types.TypeParameterInstantiation | babel.types.TSTypeParameterInstantiation | null): babel.types.TaggedTemplateExpression
		, templateElement(value: any, tail?: boolean): babel.types.TemplateElement
		, templateLiteral(quasis: Array<babel.types.TemplateElement>, Expressions: Array<babel.types.Expression>): babel.types.TemplateLiteral
		, yieldExpression(argument?: babel.types.Expression | null, delegate?: boolean): babel.types.YieldExpression
		, anyTypeAnnotation(): babel.types.AnyTypeAnnotation
		, arrayTypeAnnotation(elementType: babel.types.FlowType): babel.types.ArrayTypeAnnotation
		, booleanTypeAnnotation(): babel.types.BooleanTypeAnnotation
		, booleanLiteralTypeAnnotation(value: boolean): babel.types.BooleanLiteralTypeAnnotation
		, nullLiteralTypeAnnotation(): babel.types.NullLiteralTypeAnnotation
		, classImplements(id: babel.types.Identifier, typeParameters?: babel.types.TypeParameterInstantiation | null): babel.types.ClassImplements
		, declareClass(id: babel.types.Identifier, typeParameters: babel.types.TypeParameterDeclaration | null | undefined, _extends: Array<babel.types.InterfaceExtends> | null | undefined, body: babel.types.ObjectTypeAnnotation, _implements?: Array<babel.types.ClassImplements> | null, mixins?: Array<babel.types.InterfaceExtends> | null): babel.types.DeclareClass
		, declareFunction(id: babel.types.Identifier, predicate?: babel.types.DeclaredPredicate | null): babel.types.DeclareFunction
		, declareInterface(id: babel.types.Identifier, typeParameters: babel.types.TypeParameterDeclaration | null | undefined, _extends: Array<babel.types.InterfaceExtends> | null | undefined, body: babel.types.ObjectTypeAnnotation, _implements?: Array<babel.types.ClassImplements> | null, mixins?: Array<babel.types.InterfaceExtends> | null): babel.types.DeclareInterface
		, declareModule(id: babel.types.Identifier | babel.types.StringLiteral, body: babel.types.BlockStatement, kind?: "CommonJS" | "ES" | null): babel.types.DeclareModule
		, declareModuleExports(typeAnnotation: babel.types.TypeAnnotation): babel.types.DeclareModuleExports
		, declareModuleExports(typeAnnotation: babel.types.TypeAnnotation): babel.types.DeclareModuleExports
		, declareModuleExports(typeAnnotation: babel.types.TypeAnnotation): babel.types.DeclareModuleExports
		, declareTypeAlias(id: babel.types.Identifier, typeParameters: babel.types.TypeParameterDeclaration | null | undefined, right: babel.types.FlowType): babel.types.DeclareTypeAlias
		, declareOpaqueType(id: babel.types.Identifier, typeParameters?: babel.types.TypeParameterDeclaration | null, supertype?: babel.types.FlowType | null): babel.types.DeclareOpaqueType
		, declareVariable(id: babel.types.Identifier): babel.types.DeclareVariable
		, declareExportDeclaration(declaration?: babel.types.Flow | null, specifiers?: Array<babel.types.ExportSpecifier | babel.types.ExportNamespaceSpecifier> | null, source?: babel.types.StringLiteral | null, _default?: boolean | null): babel.types.DeclareExportDeclaration
		, declareExportAllDeclaration(source: babel.types.StringLiteral, exportKind?: ["type","value"] | null): babel.types.DeclareExportAllDeclaration
		, declaredPredicate(value: babel.types.Flow): babel.types.DeclaredPredicate
		, existsTypeAnnotation(): babel.types.ExistsTypeAnnotation
		, functionTypeAnnotation(typeParameters: babel.types.TypeParameterDeclaration | null | undefined, params: Array<babel.types.FunctionTypeParam>, rest: babel.types.FunctionTypeParam | null | undefined, returnType: babel.types.FlowType): babel.types.FunctionTypeAnnotation
		, functionTypeParam(name: babel.types.Identifier | null | undefined, typeAnnotation: babel.types.FlowType, optional?: boolean | null): babel.types.FunctionTypeParam
		, genericTypeAnnotation(id: babel.types.Identifier | babel.types.QualifiedTypeIdentifier, typeParameters?: babel.types.TypeParameterInstantiation | null): babel.types.GenericTypeAnnotation
		, inferredPredicate(): babel.types.InferredPredicate
		, interfaceExtends(id: babel.types.Identifier | babel.types.QualifiedTypeIdentifier, typeParameters?: babel.types.TypeParameterInstantiation | null): babel.types.InterfaceExtends
		, interfaceDeclaration(id: babel.types.Identifier, typeParameters: babel.types.TypeParameterDeclaration | null | undefined, _extends: Array<babel.types.InterfaceExtends> | null | undefined, body: babel.types.ObjectTypeAnnotation, _implements?: Array<babel.types.ClassImplements> | null, mixins?: Array<babel.types.InterfaceExtends> | null): babel.types.InterfaceDeclaration
		, interfaceTypeAnnotation(_extends: Array<babel.types.InterfaceExtends> | null | undefined, body: babel.types.ObjectTypeAnnotation): babel.types.InterfaceTypeAnnotation
		, intersectionTypeAnnotation(types: Array<babel.types.FlowType>): babel.types.IntersectionTypeAnnotation
		, mixedTypeAnnotation(): babel.types.MixedTypeAnnotation
		, emptyTypeAnnotation(): babel.types.EmptyTypeAnnotation
		, nullableTypeAnnotation(typeAnnotation: babel.types.FlowType): babel.types.NullableTypeAnnotation
		, numberLiteralTypeAnnotation(value: number): babel.types.NumberLiteralTypeAnnotation
		, numberTypeAnnotation(): babel.types.NumberTypeAnnotation
		, objectTypeAnnotation(properties: Array<babel.types.ObjectTypeProperty | babel.types.ObjectTypeSpreadProperty>, indexers?: Array<babel.types.ObjectTypeIndexer> | null, callProperties?: Array<babel.types.ObjectTypeCallProperty> | null, internalSlots?: Array<babel.types.ObjectTypeInternalSlot> | null, exact?: boolean, inexact?: boolean | null): babel.types.ObjectTypeAnnotation
		, objectTypeInternalSlot(id: babel.types.Identifier, value: babel.types.FlowType, optional: boolean, _static: boolean, method: boolean): babel.types.ObjectTypeInternalSlot
		, objectTypeCallProperty(value: babel.types.FlowType, _static?: boolean | null): babel.types.ObjectTypeCallProperty
		, objectTypeIndexer(id: babel.types.Identifier | null | undefined, key: babel.types.FlowType, value: babel.types.FlowType, variance?: babel.types.Variance | null, _static?: boolean | null): babel.types.ObjectTypeIndexer
		, objectTypeProperty(key: babel.types.Identifier | babel.types.StringLiteral, value: babel.types.FlowType, variance?: babel.types.Variance | null, kind?: "init" | "get" | "set" | null, optional?: boolean | null, proto?: boolean | null, _static?: boolean | null): babel.types.ObjectTypeProperty
		, objectTypeSpreadProperty(argument: babel.types.FlowType): babel.types.ObjectTypeSpreadProperty
		, opaqueType(id: babel.types.Identifier, typeParameters: babel.types.TypeParameterDeclaration | null | undefined, supertype: babel.types.FlowType | null | undefined, impltype: babel.types.FlowType): babel.types.OpaqueType
		, qualifiedTypeIdentifier(id: babel.types.Identifier, qualification: babel.types.Identifier | babel.types.QualifiedTypeIdentifier): babel.types.QualifiedTypeIdentifier
		, stringLiteralTypeAnnotation(value: string): babel.types.StringLiteralTypeAnnotation
		, stringTypeAnnotation(): babel.types.StringTypeAnnotation
		, thisTypeAnnotation(): babel.types.ThisTypeAnnotation
		, tupleTypeAnnotation(types: Array<babel.types.FlowType>): babel.types.TupleTypeAnnotation
		, typeofTypeAnnotation(argument: babel.types.FlowType): babel.types.TypeofTypeAnnotation
		, typeAlias(id: babel.types.Identifier, typeParameters: babel.types.TypeParameterDeclaration | null | undefined, right: babel.types.FlowType): babel.types.TypeAlias
		, typeAnnotation(typeAnnotation: babel.types.FlowType): babel.types.TypeAnnotation
		, typeCastExpression(expression: babel.types.Expression, typeAnnotation: babel.types.TypeAnnotation): babel.types.TypeCastExpression
		, typeParameter(bound?: babel.types.TypeAnnotation | null, _default?: babel.types.FlowType | null, variance?: babel.types.Variance | null, name?: string | null): babel.types.TypeParameter
		, typeParameterDeclaration(params: Array<babel.types.TypeParameter>): babel.types.TypeParameterDeclaration
		, typeParameterInstantiation(params: Array<babel.types.FlowType>): babel.types.TypeParameterInstantiation
		, unionTypeAnnotation(types: Array<babel.types.FlowType>): babel.types.UnionTypeAnnotation
		, variance(kind: "minus" | "plus"): babel.types.Variance
		, voidTypeAnnotation(): babel.types.VoidTypeAnnotation
		, jsxAttribute(name: babel.types.JSXIdentifier | babel.types.JSXNamespacedName, value?: babel.types.JSXElement | babel.types.JSXFragment | babel.types.StringLiteral | babel.types.JSXExpressionContainer | null): babel.types.JSXAttribute
		, jsxClosingElement(name: babel.types.JSXIdentifier | babel.types.JSXMemberExpression): babel.types.JSXClosingElement
		, jsxElement(openingElement: babel.types.JSXOpeningElement, closingElement: babel.types.JSXClosingElement | null | undefined, children: Array<babel.types.JSXText | babel.types.JSXExpressionContainer | babel.types.JSXSpreadChild | babel.types.JSXElement | babel.types.JSXFragment>, selfClosing: any): babel.types.JSXElement
		, jsxEmptyExpression(): babel.types.JSXEmptyExpression
		, jsxExpressionContainer(expression: babel.types.Expression | babel.types.JSXEmptyExpression): babel.types.JSXExpressionContainer
		, jsxSpreadChild(expression: babel.types.Expression): babel.types.JSXSpreadChild
		, jsxIdentifier(name: string): babel.types.JSXIdentifier
		, jsxMemberExpression(object: babel.types.JSXMemberExpression | babel.types.JSXIdentifier, property: babel.types.JSXIdentifier): babel.types.JSXMemberExpression
		, jsxNamespacedName(namespace: babel.types.JSXIdentifier, name: babel.types.JSXIdentifier): babel.types.JSXNamespacedName
		, jsxOpeningElement(name: babel.types.JSXIdentifier | babel.types.JSXMemberExpression, attributes: Array<babel.types.JSXAttribute | babel.types.JSXSpreadAttribute>, selfClosing?: boolean, typeParameters?: babel.types.TypeParameterInstantiation | babel.types.TSTypeParameterInstantiation | null): babel.types.JSXOpeningElement
		, jsxSpreadAttribute(argument: babel.types.Expression): babel.types.JSXSpreadAttribute
		, jsxText(value: string): babel.types.JSXText
		, jsxFragment(openingFragment: babel.types.JSXOpeningFragment, closingFragment: babel.types.JSXClosingFragment, children: Array<babel.types.JSXText | babel.types.JSXExpressionContainer | babel.types.JSXSpreadChild | babel.types.JSXElement | babel.types.JSXFragment>): babel.types.JSXFragment
		, jsxOpeningFragment(): babel.types.JSXOpeningFragment
		, jsxClosingFragment(): babel.types.JSXClosingFragment
		, noop(): babel.types.Noop
		, parenthesizedExpression(expression: babel.types.Expression): babel.types.ParenthesizedExpression
		, awaitExpression(argument: babel.types.Expression): babel.types.AwaitExpression
		, bindExpression(object: any, callee: any): babel.types.BindExpression
		, classProperty(key: babel.types.Identifier | babel.types.StringLiteral | babel.types.NumericLiteral | babel.types.Expression, value?: babel.types.Expression | null, typeAnnotation?: babel.types.TypeAnnotation | babel.types.TSTypeAnnotation | babel.types.Noop | null, decorators?: Array<babel.types.Decorator> | null, computed?: boolean, abstract?: boolean | null, accessibility?: "public" | "private" | "protected" | null, definite?: boolean | null, optional?: boolean | null, readonly?: boolean | null, _static?: boolean | null): babel.types.ClassProperty
		, optionalMemberExpression(object: babel.types.Expression, property: any, computed: boolean | undefined, optional: boolean): babel.types.OptionalMemberExpression
		, pipelineTopicExpression(expression: babel.types.Expression): babel.types.PipelineTopicExpression
		, pipelineBareFunction(callee: babel.types.Expression): babel.types.PipelineBareFunction
		, pipelinePrimaryTopicReference(): babel.types.PipelinePrimaryTopicReference
		, optionalCallExpression(callee: babel.types.Expression, _arguments: Array<babel.types.Expression | babel.types.SpreadElement | babel.types.JSXNamespacedName>, optional: boolean, typeArguments?: babel.types.TypeParameterInstantiation | null, typeParameters?: babel.types.TSTypeParameterInstantiation | null): babel.types.OptionalCallExpression
		, classPrivateProperty(key: babel.types.PrivateName, value?: babel.types.Expression | null): babel.types.ClassPrivateProperty
		, classPrivateMethod(kind: "get" | "set" | "method" | "constructor" | undefined, key: babel.types.PrivateName, params: Array<babel.types.Identifier | babel.types.Pattern | babel.types.RestElement | babel.types.TSParameterProperty>, body: babel.types.BlockStatement, _static?: boolean | null, abstract?: boolean | null, access?: "public" | "private" | "protected" | null, accessibility?: "public" | "private" | "protected" | null, async?: boolean, computed?: boolean, decorators?: Array<babel.types.Decorator> | null, generator?: boolean, optional?: boolean | null, returnType?: any | null, typeParameters?: any | null): babel.types.ClassPrivateMethod
		, decorator(expression: babel.types.Expression): babel.types.Decorator
		, doExpression(body: babel.types.BlockStatement): babel.types.DoExpression
		, exportDefaultSpecifier(exported: babel.types.Identifier): babel.types.ExportDefaultSpecifier
		, exportNamespaceSpecifier(exported: babel.types.Identifier): babel.types.ExportNamespaceSpecifier
		, privateName(id: babel.types.Identifier): babel.types.PrivateName
		, bigIntLiteral(value: string): babel.types.BigIntLiteral
		, tsParameterProperty(parameter: babel.types.Identifier | babel.types.AssignmentPattern, accessibility?: "public" | "private" | "protected" | null, readonly?: boolean | null): babel.types.TSParameterProperty
		, tsDeclareFunction(id: babel.types.Identifier | null | undefined, typeParameters: babel.types.TSTypeParameterDeclaration | babel.types.Noop | null | undefined, params: Array<babel.types.Identifier | babel.types.Pattern | babel.types.RestElement | babel.types.TSParameterProperty>, returnType?: babel.types.TSTypeAnnotation | babel.types.Noop | null, async?: boolean, declare?: boolean | null, generator?: boolean): babel.types.TSDeclareFunction
		, tsDeclareMethod(decorators: Array<babel.types.Decorator> | null | undefined, key: babel.types.Identifier | babel.types.StringLiteral | babel.types.NumericLiteral | babel.types.Expression, typeParameters: babel.types.TSTypeParameterDeclaration | babel.types.Noop | null | undefined, params: Array<babel.types.Identifier | babel.types.Pattern | babel.types.RestElement | babel.types.TSParameterProperty>, returnType?: babel.types.TSTypeAnnotation | babel.types.Noop | null, abstract?: boolean | null, access?: "public" | "private" | "protected" | null, accessibility?: "public" | "private" | "protected" | null, async?: boolean, computed?: boolean, generator?: boolean, kind?: "get" | "set" | "method" | "constructor", optional?: boolean | null, _static?: boolean | null): babel.types.TSDeclareMethod
		, tsQualifiedName(left: babel.types.TSEntityName, right: babel.types.Identifier): babel.types.TSQualifiedName
		, tsCallSignatureDeclaration(typeParameters?: babel.types.TSTypeParameterDeclaration | null, parameters?: Array<babel.types.Identifier | babel.types.RestElement> | null, typeAnnotation?: babel.types.TSTypeAnnotation | null): babel.types.TSCallSignatureDeclaration
		, tsConstructSignatureDeclaration(typeParameters?: babel.types.TSTypeParameterDeclaration | null, parameters?: Array<babel.types.Identifier | babel.types.RestElement> | null, typeAnnotation?: babel.types.TSTypeAnnotation | null): babel.types.TSConstructSignatureDeclaration
		, tsPropertySignature(key: babel.types.Expression, typeAnnotation?: babel.types.TSTypeAnnotation | null, initializer?: babel.types.Expression | null, computed?: boolean | null, optional?: boolean | null, readonly?: boolean | null): babel.types.TSPropertySignature
		, tsMethodSignature(key: babel.types.Expression, typeParameters?: babel.types.TSTypeParameterDeclaration | null, parameters?: Array<babel.types.Identifier | babel.types.RestElement> | null, typeAnnotation?: babel.types.TSTypeAnnotation | null, computed?: boolean | null, optional?: boolean | null): babel.types.TSMethodSignature
		, tsIndexSignature(parameters: Array<babel.types.Identifier>, typeAnnotation?: babel.types.TSTypeAnnotation | null, readonly?: boolean | null): babel.types.TSIndexSignature
		, tsAnyKeyword(): babel.types.TSAnyKeyword
		, tsUnknownKeyword(): babel.types.TSUnknownKeyword
		, tsNumberKeyword(): babel.types.TSNumberKeyword
		, tsObjectKeyword(): babel.types.TSObjectKeyword
		, tsBooleanKeyword(): babel.types.TSBooleanKeyword
		, tsStringKeyword(): babel.types.TSStringKeyword
		, tsSymbolKeyword(): babel.types.TSSymbolKeyword
		, tsVoidKeyword(): babel.types.TSVoidKeyword
		, tsUndefinedKeyword(): babel.types.TSUndefinedKeyword
		, tsNullKeyword(): babel.types.TSNullKeyword
		, tsNeverKeyword(): babel.types.TSNeverKeyword
		, tsThisType(): babel.types.TSThisType
		, tsFunctionType(typeParameters?: babel.types.TSTypeParameterDeclaration | null, typeAnnotation?: babel.types.TSTypeAnnotation | null, parameters?: Array<babel.types.Identifier | babel.types.RestElement> | null): babel.types.TSFunctionType
		, tsConstructorType(typeParameters?: babel.types.TSTypeParameterDeclaration | null, typeAnnotation?: babel.types.TSTypeAnnotation | null, parameters?: Array<babel.types.Identifier | babel.types.RestElement> | null): babel.types.TSConstructorType
		, tsTypeReference(typeName: babel.types.TSEntityName, typeParameters?: babel.types.TSTypeParameterInstantiation | null): babel.types.TSTypeReference
		, tsTypePredicate(parameterName: babel.types.Identifier | babel.types.TSThisType, typeAnnotation: babel.types.TSTypeAnnotation): babel.types.TSTypePredicate
		, tsTypeQuery(exprName: babel.types.TSEntityName | babel.types.TSImportType): babel.types.TSTypeQuery
		, tsTypeLiteral(members: Array<babel.types.TSTypeElement>): babel.types.TSTypeLiteral
		, tsArrayType(elementType: babel.types.TSType): babel.types.TSArrayType
		, tsTupleType(elementTypes: Array<babel.types.TSType>): babel.types.TSTupleType
		, tsOptionalType(typeAnnotation: babel.types.TSType): babel.types.TSOptionalType
		, tsRestType(typeAnnotation: babel.types.TSType): babel.types.TSRestType
		, tsUnionType(types: Array<babel.types.TSType>): babel.types.TSUnionType
		, tsIntersectionType(types: Array<babel.types.TSType>): babel.types.TSIntersectionType
		, tsConditionalType(checkType: babel.types.TSType, extendsType: babel.types.TSType, trueType: babel.types.TSType, falseType: babel.types.TSType): babel.types.TSConditionalType
		, tsInferType(typeParameter: babel.types.TSTypeParameter): babel.types.TSInferType
		, tsParenthesizedType(typeAnnotation: babel.types.TSType): babel.types.TSParenthesizedType
		, tsTypeOperator(typeAnnotation: babel.types.TSType, operator?: string | null): babel.types.TSTypeOperator
		, tsIndexedAccessType(objectType: babel.types.TSType, indexType: babel.types.TSType): babel.types.TSIndexedAccessType
		, tsMappedType(typeParameter: babel.types.TSTypeParameter, typeAnnotation?: babel.types.TSType | null, optional?: boolean | null, readonly?: boolean | null): babel.types.TSMappedType
		, tsLiteralType(literal: babel.types.NumericLiteral | babel.types.StringLiteral | babel.types.BooleanLiteral): babel.types.TSLiteralType
		, tsExpressionWithTypeArguments(expression: babel.types.TSEntityName, typeParameters?: babel.types.TSTypeParameterInstantiation | null): babel.types.TSExpressionWithTypeArguments
		, tsInterfaceDeclaration(id: babel.types.Identifier, typeParameters: babel.types.TSTypeParameterDeclaration | null | undefined, _extends: Array<babel.types.TSExpressionWithTypeArguments> | null | undefined, body: babel.types.TSInterfaceBody, declare?: boolean | null): babel.types.TSInterfaceDeclaration
		, tsInterfaceBody(body: Array<babel.types.TSTypeElement>): babel.types.TSInterfaceBody
		, tsTypeAliasDeclaration(id: babel.types.Identifier, typeParameters: babel.types.TSTypeParameterDeclaration | null | undefined, typeAnnotation: babel.types.TSType, declare?: boolean | null): babel.types.TSTypeAliasDeclaration
		, tsAsExpression(expression: babel.types.Expression, typeAnnotation: babel.types.TSType): babel.types.TSAsExpression
		, tsTypeAssertion(typeAnnotation: babel.types.TSType, Expression: babel.types.Expression): babel.types.TSTypeAssertion
		, tsEnumDeclaration(id: babel.types.Identifier, members: Array<babel.types.TSEnumMember>, _const?: boolean | null, declare?: boolean | null, initializer?: babel.types.Expression | null): babel.types.TSEnumDeclaration
		, tsEnumMember(id: babel.types.Identifier | babel.types.StringLiteral, initializer?: babel.types.Expression | null): babel.types.TSEnumMember
		, tsModuleDeclaration(id: babel.types.Identifier | babel.types.StringLiteral, body: babel.types.TSModuleBlock | babel.types.TSModuleDeclaration, declare?: boolean | null, global?: boolean | null): babel.types.TSModuleDeclaration
		, tsModuleBlock(body: Array<babel.types.Statement>): babel.types.TSModuleBlock
		, tsImportType(argument: babel.types.StringLiteral, qualifier?: babel.types.TSEntityName | null, typeParameters?: babel.types.TSTypeParameterInstantiation | null): babel.types.TSImportType
		, tsImportEqualsDeclaration(id: babel.types.Identifier, moduleReference: babel.types.TSEntityName | babel.types.TSExternalModuleReference, isExport?: boolean | null): babel.types.TSImportEqualsDeclaration
		, tsImportEqualsDeclaration(id: babel.types.Identifier, moduleReference: babel.types.TSEntityName | babel.types.TSExternalModuleReference, isExport?: boolean | null): babel.types.TSImportEqualsDeclaration
		, tsExternalModuleReference(expression: babel.types.StringLiteral): babel.types.TSExternalModuleReference
		, tsNonNullExpression(expression: babel.types.Expression): babel.types.TSNonNullExpression
		, tsExportAssignment(expression: babel.types.Expression): babel.types.TSExportAssignment
		, tsNamespaceExportDeclaration(id: babel.types.Identifier): babel.types.TSNamespaceExportDeclaration
		, tsTypeAnnotation(typeAnnotation: babel.types.TSType): babel.types.TSTypeAnnotation
		, tsTypeParameterInstantiation(params: Array<babel.types.TSType>): babel.types.TSTypeParameterInstantiation
		, tsTypeParameterDeclaration(params: Array<babel.types.TSTypeParameter>): babel.types.TSTypeParameterDeclaration
		, tsTypeParameter(constraint?: babel.types.TSType | null, _default?: babel.types.TSType | null, name?: string | null): babel.types.TSTypeParameter
		, isAnyTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.AnyTypeAnnotation
		, isArrayExpression(node: object | null | undefined, opts?: object | null): node is babel.types.ArrayExpression
		, isArrayPattern(node: object | null | undefined, opts?: object | null): node is babel.types.ArrayPattern
		, isArrayTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.ArrayTypeAnnotation
		, isArrowFunctionExpression(node: object | null | undefined, opts?: object | null): node is babel.types.ArrowFunctionExpression
		, isAssignmentExpression(node: object | null | undefined, opts?: object | null): node is babel.types.AssignmentExpression
		, isAssignmentPattern(node: object | null | undefined, opts?: object | null): node is babel.types.AssignmentPattern
		, isAwaitExpression(node: object | null | undefined, opts?: object | null): node is babel.types.AwaitExpression
		, isBigIntLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.BigIntLiteral
		, isBinary(node: object | null | undefined, opts?: object | null): node is babel.types.Binary
		, isBinaryExpression(node: object | null | undefined, opts?: object | null): node is babel.types.BinaryExpression
		, isBindExpression(node: object | null | undefined, opts?: object | null): node is babel.types.BindExpression
		, isBlock(node: object | null | undefined, opts?: object | null): node is babel.types.Block
		, isBlockParent(node: object | null | undefined, opts?: object | null): node is babel.types.BlockParent
		, isBlockStatement(node: object | null | undefined, opts?: object | null): node is babel.types.BlockStatement
		, isBooleanLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.BooleanLiteral
		, isBooleanLiteralTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.BooleanLiteralTypeAnnotation
		, isBooleanTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.BooleanTypeAnnotation
		, isBreakStatement(node: object | null | undefined, opts?: object | null): node is babel.types.BreakStatement
		, isCallExpression(node: object | null | undefined, opts?: object | null): node is babel.types.CallExpression
		, isCatchClause(node: object | null | undefined, opts?: object | null): node is babel.types.CatchClause
		, isClass(node: object | null | undefined, opts?: object | null): node is babel.types.Class
		, isClassBody(node: object | null | undefined, opts?: object | null): node is babel.types.ClassBody
		, isClassDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.ClassDeclaration
		, isClassExpression(node: object | null | undefined, opts?: object | null): node is babel.types.ClassExpression
		, isClassImplements(node: object | null | undefined, opts?: object | null): node is babel.types.ClassImplements
		, isClassMethod(node: object | null | undefined, opts?: object | null): node is babel.types.ClassMethod
		, isClassPrivateMethod(node: object | null | undefined, opts?: object | null): node is babel.types.ClassPrivateMethod
		, isClassPrivateProperty(node: object | null | undefined, opts?: object | null): node is babel.types.ClassPrivateProperty
		, isClassProperty(node: object | null | undefined, opts?: object | null): node is babel.types.ClassProperty
		, isCompletionStatement(node: object | null | undefined, opts?: object | null): node is babel.types.CompletionStatement
		, isConditional(node: object | null | undefined, opts?: object | null): node is babel.types.Conditional
		, isConditionalExpression(node: object | null | undefined, opts?: object | null): node is babel.types.ConditionalExpression
		, isContinueStatement(node: object | null | undefined, opts?: object | null): node is babel.types.ContinueStatement
		, isDebuggerStatement(node: object | null | undefined, opts?: object | null): node is babel.types.DebuggerStatement
		, isDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.Declaration
		, isDeclareClass(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareClass
		, isDeclareExportAllDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareExportAllDeclaration
		, isDeclareExportDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareExportDeclaration
		, isDeclareFunction(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareFunction
		, isDeclareInterface(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareInterface
		, isDeclareModule(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareModule
		, isDeclareModuleExports(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareModuleExports
		, isDeclareOpaqueType(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareOpaqueType
		, isDeclareTypeAlias(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareTypeAlias
		, isDeclareVariable(node: object | null | undefined, opts?: object | null): node is babel.types.DeclareVariable
		, isDeclaredPredicate(node: object | null | undefined, opts?: object | null): node is babel.types.DeclaredPredicate
		, isDecorator(node: object | null | undefined, opts?: object | null): node is babel.types.Decorator
		, isDirective(node: object | null | undefined, opts?: object | null): node is babel.types.Directive
		, isDirectiveLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.DirectiveLiteral
		, isDoExpression(node: object | null | undefined, opts?: object | null): node is babel.types.DoExpression
		, isDoWhileStatement(node: object | null | undefined, opts?: object | null): node is babel.types.DoWhileStatement
		, isEmptyStatement(node: object | null | undefined, opts?: object | null): node is babel.types.EmptyStatement
		, isEmptyTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.EmptyTypeAnnotation
		, isExistsTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.ExistsTypeAnnotation
		, isExportAllDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.ExportAllDeclaration
		, isExportDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.ExportDeclaration
		, isExportDefaultDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.ExportDefaultDeclaration
		, isExportDefaultSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ExportDefaultSpecifier
		, isExportNamedDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.ExportNamedDeclaration
		, isExportNamespaceSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ExportNamespaceSpecifier
		, isExportSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ExportSpecifier
		, isExportSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ExportSpecifier
		, isExportSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ExportSpecifier
		, isExpression(node: object | null | undefined, opts?: object | null): node is babel.types.Expression
		, isExpressionStatement(node: object | null | undefined, opts?: object | null): node is babel.types.ExpressionStatement
		, isExpressionWrapper(node: object | null | undefined, opts?: object | null): node is babel.types.ExpressionWrapper
		, isFile(node: object | null | undefined, opts?: object | null): node is babel.types.File
		, isFlow(node: object | null | undefined, opts?: object | null): node is babel.types.Flow
		, isFlowBaseAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.FlowBaseAnnotation
		, isFlowDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.FlowDeclaration
		, isFlowPredicate(node: object | null | undefined, opts?: object | null): node is babel.types.FlowPredicate
		, isFlowType(node: object | null | undefined, opts?: object | null): node is babel.types.FlowType
		, isFor(node: object | null | undefined, opts?: object | null): node is babel.types.For
		, isForInStatement(node: object | null | undefined, opts?: object | null): node is babel.types.ForInStatement
		, isForOfStatement(node: object | null | undefined, opts?: object | null): node is babel.types.ForOfStatement
		, isForStatement(node: object | null | undefined, opts?: object | null): node is babel.types.ForStatement
		, isForXStatement(node: object | null | undefined, opts?: object | null): node is babel.types.ForXStatement
		, isFunction(node: object | null | undefined, opts?: object | null): node is Function
		, isFunctionDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.FunctionDeclaration
		, isFunctionExpression(node: object | null | undefined, opts?: object | null): node is babel.types.FunctionExpression
		, isFunctionParent(node: object | null | undefined, opts?: object | null): node is babel.types.FunctionParent
		, isFunctionTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.FunctionTypeAnnotation
		, isFunctionTypeParam(node: object | null | undefined, opts?: object | null): node is babel.types.FunctionTypeParam
		, isGenericTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.GenericTypeAnnotation
		, isIdentifier(node: object | null | undefined, opts?: object | null): node is babel.types.Identifier
		, isIfStatement(node: object | null | undefined, opts?: object | null): node is babel.types.IfStatement
		, isImmutable(node: object | null | undefined, opts?: object | null): node is babel.types.Immutable
		, isImport(node: object | null | undefined, opts?: object | null): node is babel.types.Import
		, isImportDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.ImportDeclaration
		, isImportDefaultSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ImportDefaultSpecifier
		, isImportNamespaceSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ImportNamespaceSpecifier
		, isImportSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ImportSpecifier
		, isInferredPredicate(node: object | null | undefined, opts?: object | null): node is babel.types.InferredPredicate
		, isInterfaceDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.InterfaceDeclaration
		, isInterfaceExtends(node: object | null | undefined, opts?: object | null): node is babel.types.InterfaceExtends
		, isInterfaceTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.InterfaceTypeAnnotation
		, isInterpreterDirective(node: object | null | undefined, opts?: object | null): node is babel.types.InterpreterDirective
		, isIntersectionTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.IntersectionTypeAnnotation
		, isJSX(node: object | null | undefined, opts?: object | null): node is babel.types.JSX
		, isJSXAttribute(node: object | null | undefined, opts?: object | null): node is babel.types.JSXAttribute
		, isJSXClosingElement(node: object | null | undefined, opts?: object | null): node is babel.types.JSXClosingElement
		, isJSXClosingFragment(node: object | null | undefined, opts?: object | null): node is babel.types.JSXClosingFragment
		, isJSXElement(node: object | null | undefined, opts?: object | null): node is babel.types.JSXElement
		, isJSXEmptyExpression(node: object | null | undefined, opts?: object | null): node is babel.types.JSXEmptyExpression
		, isJSXExpressionContainer(node: object | null | undefined, opts?: object | null): node is babel.types.JSXExpressionContainer
		, isJSXFragment(node: object | null | undefined, opts?: object | null): node is babel.types.JSXFragment
		, isJSXIdentifier(node: object | null | undefined, opts?: object | null): node is babel.types.JSXIdentifier
		, isJSXMemberExpression(node: object | null | undefined, opts?: object | null): node is babel.types.JSXMemberExpression
		, isJSXNamespacedName(node: object | null | undefined, opts?: object | null): node is babel.types.JSXNamespacedName
		, isJSXOpeningElement(node: object | null | undefined, opts?: object | null): node is babel.types.JSXOpeningElement
		, isJSXOpeningFragment(node: object | null | undefined, opts?: object | null): node is babel.types.JSXOpeningFragment
		, isJSXSpreadAttribute(node: object | null | undefined, opts?: object | null): node is babel.types.JSXSpreadAttribute
		, isJSXSpreadChild(node: object | null | undefined, opts?: object | null): node is babel.types.JSXSpreadChild
		, isJSXText(node: object | null | undefined, opts?: object | null): node is babel.types.JSXText
		, isLVal(node: object | null | undefined, opts?: object | null): node is babel.types.LVal
		, isLabeledStatement(node: object | null | undefined, opts?: object | null): node is babel.types.LabeledStatement
		, isLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.Literal
		, isLogicalExpression(node: object | null | undefined, opts?: object | null): node is babel.types.LogicalExpression
		, isLoop(node: object | null | undefined, opts?: object | null): node is babel.types.Loop
		, isMemberExpression(node: object | null | undefined, opts?: object | null): node is babel.types.MemberExpression
		, isMetaProperty(node: object | null | undefined, opts?: object | null): node is babel.types.MetaProperty
		, isMethod(node: object | null | undefined, opts?: object | null): node is babel.types.Method
		, isMixedTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.MixedTypeAnnotation
		, isModuleDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.ModuleDeclaration
		, isModuleSpecifier(node: object | null | undefined, opts?: object | null): node is babel.types.ModuleSpecifier
		, isNewExpression(node: object | null | undefined, opts?: object | null): node is babel.types.NewExpression
		, isNoop(node: object | null | undefined, opts?: object | null): node is babel.types.Noop
		, isNullLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.NullLiteral
		, isNullLiteralTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.NullLiteralTypeAnnotation
		, isNullableTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.NullableTypeAnnotation
		, isNumberLiteral(node: object | null | undefined, opts?: object | null): boolean
		, isNumberLiteralTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.NumberLiteralTypeAnnotation
		, isNumberTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.NumberTypeAnnotation
		, isNumericLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.NumericLiteral
		, isObjectExpression(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectExpression
		, isObjectMember(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectMember
		, isObjectMethod(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectMethod
		, isObjectPattern(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectPattern
		, isObjectProperty(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectProperty
		, isObjectTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectTypeAnnotation
		, isObjectTypeCallProperty(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectTypeCallProperty
		, isObjectTypeIndexer(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectTypeIndexer
		, isObjectTypeInternalSlot(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectTypeInternalSlot
		, isObjectTypeProperty(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectTypeProperty
		, isObjectTypeSpreadProperty(node: object | null | undefined, opts?: object | null): node is babel.types.ObjectTypeSpreadProperty
		, isOpaqueType(node: object | null | undefined, opts?: object | null): node is babel.types.OpaqueType
		, isOptionalCallExpression(node: object | null | undefined, opts?: object | null): node is babel.types.OptionalCallExpression
		, isOptionalMemberExpression(node: object | null | undefined, opts?: object | null): node is babel.types.OptionalMemberExpression
		, isParenthesizedExpression(node: object | null | undefined, opts?: object | null): node is babel.types.ParenthesizedExpression
		, isPattern(node: object | null | undefined, opts?: object | null): node is babel.types.Pattern
		, isPatternLike(node: object | null | undefined, opts?: object | null): node is babel.types.PatternLike
		, isPipelineBareFunction(node: object | null | undefined, opts?: object | null): node is babel.types.PipelineBareFunction
		, isPipelinePrimaryTopicReference(node: object | null | undefined, opts?: object | null): node is babel.types.PipelinePrimaryTopicReference
		, isPipelineTopicExpression(node: object | null | undefined, opts?: object | null): node is babel.types.PipelineTopicExpression
		, isPrivate(node: object | null | undefined, opts?: object | null): node is babel.types.Private
		, isPrivateName(node: object | null | undefined, opts?: object | null): node is babel.types.PrivateName
		, isProgram(node: object | null | undefined, opts?: object | null): node is babel.types.Program
		, isProperty(node: object | null | undefined, opts?: object | null): node is babel.types.Property
		, isPureish(node: object | null | undefined, opts?: object | null): node is babel.types.Pureish
		, isQualifiedTypeIdentifier(node: object | null | undefined, opts?: object | null): node is babel.types.QualifiedTypeIdentifier
		, isRegExpLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.RegExpLiteral
		, isRegexLiteral(node: object | null | undefined, opts?: object | null): boolean
		, isRestElement(node: object | null | undefined, opts?: object | null): node is babel.types.RestElement
		, isRestProperty(node: object | null | undefined, opts?: object | null): boolean
		, isReturnStatement(node: object | null | undefined, opts?: object | null): node is babel.types.ReturnStatement
		, isScopable(node: object | null | undefined, opts?: object | null): node is babel.types.Scopable
		, isSequenceExpression(node: object | null | undefined, opts?: object | null): node is babel.types.SequenceExpression
		, isSpreadElement(node: object | null | undefined, opts?: object | null): node is babel.types.SpreadElement
		, isSpreadProperty(node: object | null | undefined, opts?: object | null): boolean
		, isStatement(node: object | null | undefined, opts?: object | null): node is babel.types.Statement
		, isStringLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.StringLiteral
		, isStringLiteralTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.StringLiteralTypeAnnotation
		, isStringTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.StringTypeAnnotation
		, isSuper(node: object | null | undefined, opts?: object | null): node is babel.types.Super
		, isSwitchCase(node: object | null | undefined, opts?: object | null): node is babel.types.SwitchCase
		, isSwitchStatement(node: object | null | undefined, opts?: object | null): node is babel.types.SwitchStatement
		, isTSAnyKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSAnyKeyword
		, isTSArrayType(node: object | null | undefined, opts?: object | null): node is babel.types.TSArrayType
		, isTSAsExpression(node: object | null | undefined, opts?: object | null): node is babel.types.TSAsExpression
		, isTSBooleanKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSBooleanKeyword
		, isTSCallSignatureDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSCallSignatureDeclaration
		, isTSConditionalType(node: object | null | undefined, opts?: object | null): node is babel.types.TSConditionalType
		, isTSConstructSignatureDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSConstructSignatureDeclaration
		, isTSConstructorType(node: object | null | undefined, opts?: object | null): node is babel.types.TSConstructorType
		, isTSDeclareFunction(node: object | null | undefined, opts?: object | null): node is babel.types.TSDeclareFunction
		, isTSDeclareMethod(node: object | null | undefined, opts?: object | null): node is babel.types.TSDeclareMethod
		, isTSEntityName(node: object | null | undefined, opts?: object | null): node is babel.types.TSEntityName
		, isTSEnumDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSEnumDeclaration
		, isTSEnumMember(node: object | null | undefined, opts?: object | null): node is babel.types.TSEnumMember
		, isTSExportAssignment(node: object | null | undefined, opts?: object | null): node is babel.types.TSExportAssignment
		, isTSExportAssignment(node: object | null | undefined, opts?: object | null): node is babel.types.TSExportAssignment
		, isTSExportAssignment(node: object | null | undefined, opts?: object | null): node is babel.types.TSExportAssignment
		, isTSExpressionWithTypeArguments(node: object | null | undefined, opts?: object | null): node is babel.types.TSExpressionWithTypeArguments
		, isTSExternalModuleReference(node: object | null | undefined, opts?: object | null): node is babel.types.TSExternalModuleReference
		, isTSFunctionType(node: object | null | undefined, opts?: object | null): node is babel.types.TSFunctionType
		, isTSImportEqualsDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSImportEqualsDeclaration
		, isTSImportType(node: object | null | undefined, opts?: object | null): node is babel.types.TSImportType
		, isTSIndexSignature(node: object | null | undefined, opts?: object | null): node is babel.types.TSIndexSignature
		, isTSIndexedAccessType(node: object | null | undefined, opts?: object | null): node is babel.types.TSIndexedAccessType
		, isTSInferType(node: object | null | undefined, opts?: object | null): node is babel.types.TSInferType
		, isTSInterfaceBody(node: object | null | undefined, opts?: object | null): node is babel.types.TSInterfaceBody
		, isTSInterfaceDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSInterfaceDeclaration
		, isTSIntersectionType(node: object | null | undefined, opts?: object | null): node is babel.types.TSIntersectionType
		, isTSLiteralType(node: object | null | undefined, opts?: object | null): node is babel.types.TSLiteralType
		, isTSMappedType(node: object | null | undefined, opts?: object | null): node is babel.types.TSMappedType
		, isTSMethodSignature(node: object | null | undefined, opts?: object | null): node is babel.types.TSMethodSignature
		, isTSModuleBlock(node: object | null | undefined, opts?: object | null): node is babel.types.TSModuleBlock
		, isTSModuleDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSModuleDeclaration
		, isTSNamespaceExportDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSNamespaceExportDeclaration
		, isTSNamespaceExportDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSNamespaceExportDeclaration
		, isTSNamespaceExportDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSNamespaceExportDeclaration
		, isTSNeverKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSNeverKeyword
		, isTSNonNullExpression(node: object | null | undefined, opts?: object | null): node is babel.types.TSNonNullExpression
		, isTSNullKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSNullKeyword
		, isTSNumberKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSNumberKeyword
		, isTSObjectKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSObjectKeyword
		, isTSOptionalType(node: object | null | undefined, opts?: object | null): node is babel.types.TSOptionalType
		, isTSParameterProperty(node: object | null | undefined, opts?: object | null): node is babel.types.TSParameterProperty
		, isTSParenthesizedType(node: object | null | undefined, opts?: object | null): node is babel.types.TSParenthesizedType
		, isTSPropertySignature(node: object | null | undefined, opts?: object | null): node is babel.types.TSPropertySignature
		, isTSQualifiedName(node: object | null | undefined, opts?: object | null): node is babel.types.TSQualifiedName
		, isTSRestType(node: object | null | undefined, opts?: object | null): node is babel.types.TSRestType
		, isTSStringKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSStringKeyword
		, isTSSymbolKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSSymbolKeyword
		, isTSThisType(node: object | null | undefined, opts?: object | null): node is babel.types.TSThisType
		, isTSTupleType(node: object | null | undefined, opts?: object | null): node is babel.types.TSTupleType
		, isTSType(node: object | null | undefined, opts?: object | null): node is babel.types.TSType
		, isTSTypeAliasDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeAliasDeclaration
		, isTSTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeAnnotation
		, isTSTypeAssertion(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeAssertion
		, isTSTypeElement(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeElement
		, isTSTypeLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeLiteral
		, isTSTypeOperator(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeOperator
		, isTSTypeParameter(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeParameter
		, isTSTypeParameterDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeParameterDeclaration
		, isTSTypeParameterInstantiation(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeParameterInstantiation
		, isTSTypePredicate(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypePredicate
		, isTSTypeQuery(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeQuery
		, isTSTypeReference(node: object | null | undefined, opts?: object | null): node is babel.types.TSTypeReference
		, isTSUndefinedKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSUndefinedKeyword
		, isTSUnionType(node: object | null | undefined, opts?: object | null): node is babel.types.TSUnionType
		, isTSUnknownKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSUnknownKeyword
		, isTSVoidKeyword(node: object | null | undefined, opts?: object | null): node is babel.types.TSVoidKeyword
		, isTaggedTemplateExpression(node: object | null | undefined, opts?: object | null): node is babel.types.TaggedTemplateExpression
		, isTemplateElement(node: object | null | undefined, opts?: object | null): node is babel.types.TemplateElement
		, isTemplateLiteral(node: object | null | undefined, opts?: object | null): node is babel.types.TemplateLiteral
		, isTerminatorless(node: object | null | undefined, opts?: object | null): node is babel.types.Terminatorless
		, isThisExpression(node: object | null | undefined, opts?: object | null): node is babel.types.ThisExpression
		, isThisTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.ThisTypeAnnotation
		, isThrowStatement(node: object | null | undefined, opts?: object | null): node is babel.types.ThrowStatement
		, isTryStatement(node: object | null | undefined, opts?: object | null): node is babel.types.TryStatement
		, isTupleTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.TupleTypeAnnotation
		, isTypeAlias(node: object | null | undefined, opts?: object | null): node is babel.types.TypeAlias
		, isTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.TypeAnnotation
		, isTypeCastExpression(node: object | null | undefined, opts?: object | null): node is babel.types.TypeCastExpression
		, isTypeParameter(node: object | null | undefined, opts?: object | null): node is babel.types.TypeParameter
		, isTypeParameterDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.TypeParameterDeclaration
		, isTypeParameterInstantiation(node: object | null | undefined, opts?: object | null): node is babel.types.TypeParameterInstantiation
		, isTypeofTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.TypeofTypeAnnotation
		, isUnaryExpression(node: object | null | undefined, opts?: object | null): node is babel.types.UnaryExpression
		, isUnaryLike(node: object | null | undefined, opts?: object | null): node is babel.types.UnaryLike
		, isUnionTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.UnionTypeAnnotation
		, isUpdateExpression(node: object | null | undefined, opts?: object | null): node is babel.types.UpdateExpression
		, isUserWhitespacable(node: object | null | undefined, opts?: object | null): node is babel.types.UserWhitespacable
		, isVariableDeclaration(node: object | null | undefined, opts?: object | null): node is babel.types.VariableDeclaration
		, isVariableDeclarator(node: object | null | undefined, opts?: object | null): node is babel.types.VariableDeclarator
		, isVariance(node: object | null | undefined, opts?: object | null): node is babel.types.Variance
		, isVoidTypeAnnotation(node: object | null | undefined, opts?: object | null): node is babel.types.VoidTypeAnnotation
		, isWhile(node: object | null | undefined, opts?: object | null): node is babel.types.While
		, isWhileStatement(node: object | null | undefined, opts?: object | null): node is babel.types.WhileStatement
		, isWithStatement(node: object | null | undefined, opts?: object | null): node is babel.types.WithStatement
		, isYieldExpression(node: object | null | undefined, opts?: object | null): node is babel.types.YieldExpression
		, validate(n: Node, key: string, value: any): void
		, clone<T extends Node>(n: T): T
		, cloneDeep<T extends Node>(n: T): T, removeProperties(n: Node, opts?: { preserveComments: boolean } | null): void
		, removePropertiesDeep<T extends Node>(n: T,opts?: { preserveComments: boolean } | null): T
		, traverse<T>(n: Node, h: babel.types.TraversalHandler<T> | babel.types.TraversalHandlers<T>, state?: T): void


        , arrayExpression(elements?: Array<null | babel.types.Expression | babel.types.SpreadElement>): babel.types.ArrayExpression
        , traverse<T>(n: Node, h: babel.types.TraversalHandler<T> | babel.types.TraversalHandlers<T>, state?: T): void
        , TraversalAncestors: babel.types.TraversalAncestors
        , TraversalHandler<T>(node: babel.types.Node, parent: babel.types.TraversalAncestors, type: T): void
        //, TraversalHandlers: babel.types.TraversalHandlers<T>
        

    }
}

