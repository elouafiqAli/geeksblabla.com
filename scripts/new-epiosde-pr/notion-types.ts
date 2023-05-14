export interface EpisodesNotionResponse {
  object: string
  id: string
  created_time: Date
  last_edited_time?: Date
  created_by: TedBy
  last_edited_by: TedBy
  cover: null
  icon: Icon
  parent: Parent
  archived: boolean
  properties: Properties
  url: string
}

interface TedBy {
  object: string
  id: string
}

interface Icon {
  type: string
  emoji: string
}

interface Parent {
  type: string
  database_id: string
}

interface Properties {
  "Event ID": EventID
  Guests: Sts
  "Created By": CreatedByClass
  "Guests Emails": StsEmails
  "Potential guests": PotentialGuests
  "StreamYard Link": EventID
  Status: Category
  "Invitation description": Invitation
  "Assign to ": AssignTo
  "Youtube URL": EventID
  "Hosts Emails": StsEmails
  "Invitation Emails ": Invitation
  Date: DateClass
  "Description ": Description
  Hosts: Sts
  "Category ": Category
  title: PropertiesTitle
}

interface AssignTo {
  id: string
  type: string
  people: CreatedBy[]
}

interface CreatedBy {
  object: string
  id: string
  name: string
  avatar_url: null | string
  type: string
  person: Person
}

interface Person {
  email: string
}

interface Category {
  id: string
  type: string
  select: Select
}

interface Select {
  id: string
  name: string
  color: string
}

interface CreatedByClass {
  id: string
  type: string
  created_by: CreatedBy
}

interface DateClass {
  id: string
  type: string
  date: DateDate
}

interface DateDate {
  start: Date
  end: null
  time_zone: null
}

interface Description {
  id: string
  type: string
  rich_text: any[]
}

interface EventID {
  id: string
  type: string
  url: string
}

interface Sts {
  id: string
  type: string
  relation: Relation[]
  has_more: boolean
}

interface Relation {
  id: string
}

interface StsEmails {
  id: string
  type: string
  rollup: Rollup
}

interface Rollup {
  type: string
  array: ArrayElement[]
  function: string
}

interface ArrayElement {
  type: string
  email: string
}

interface Invitation {
  id: string
  type: string
  formula: Formula
}

interface Formula {
  type: string
  string: string
}

interface PotentialGuests {
  id: string
  type: string
  multi_select: any[]
}

interface PropertiesTitle {
  id: string
  type: string
  title: TitleElement[]
}

interface TitleElement {
  type: string
  text: Text
  annotations: Annotations
  plain_text: string
  href: null
}

interface Annotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

interface Text {
  content: string
  link: null
}
