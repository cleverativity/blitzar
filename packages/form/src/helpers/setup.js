import { merge } from 'merge-anything'
import Vue from 'vue'
import Platform from './Platform'

const queues = {
  server: [], // on SSR update
  takeover: [], // on client takeover
}

export function setup() {
  const patchQSettings = {
    blitzar: true,
    // platform: Platform,
    dark: { isActive: false, mode: false },
    iconSet: {
      field: {
        clear: 'cancel',
        error: `img:data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" style="color:rgb(222,55,55);" width="26" height="26" viewBox="0 0 20 20"><g fill="none" fill-rule="evenodd"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M10 7v4"/><circle cx="10" cy="14" r="1" fill="currentColor"/><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2"/></g></svg>`,
      },
    },
  }
  // $q not found
  if (!('$q' in Vue.prototype)) {
    // required plugins
    Platform.install(patchQSettings, queues)
    Vue.prototype['$q'] = patchQSettings
    return
  }
  // $q found, but was added from Blitzar
  if (Vue.prototype['$q']?.blitzar === true) {
    Vue.prototype['$q'] = merge(Vue.prototype['$q'], patchQSettings)
  }
}

// full example:
// {
//   version: '1.14.7',
//   config: {},
//   platform: {
//     userAgent:
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
//     is: {
//       chrome: true,
//       version: '87.0.4280.88',
//       versionNumber: 87,
//       mac: true,
//       desktop: true,
//       webkit: true,
//       name: 'chrome',
//       platform: 'mac',
//     },
//     has: { touch: false, webStorage: true },
//     within: { iframe: false },
//   },
//   dark: { isActive: false, mode: false },
//   screen: {
//     width: 1110,
//     height: 986,
//     name: 'md',
//     sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 },
//     lt: { sm: false, md: false, lg: true, xl: true },
//     gt: { xs: true, sm: true, md: false, lg: false },
//     xs: false,
//     sm: false,
//     md: true,
//     lg: false,
//     xl: false,
//   },
//   lang: {
//     isoName: 'en-us',
//     nativeName: 'English (US)',
//     label: {
//       clear: 'Clear',
//       ok: 'OK',
//       cancel: 'Cancel',
//       close: 'Close',
//       set: 'Set',
//       select: 'Select',
//       reset: 'Reset',
//       remove: 'Remove',
//       update: 'Update',
//       create: 'Create',
//       search: 'Search',
//       filter: 'Filter',
//       refresh: 'Refresh',
//     },
//     date: {
//       days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//       daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//       months: [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June',
//         'July',
//         'August',
//         'September',
//         'October',
//         'November',
//         'December',
//       ],
//       monthsShort: [
//         'Jan',
//         'Feb',
//         'Mar',
//         'Apr',
//         'May',
//         'Jun',
//         'Jul',
//         'Aug',
//         'Sep',
//         'Oct',
//         'Nov',
//         'Dec',
//       ],
//       firstDayOfWeek: 0,
//       format24h: false,
//       pluralDay: 'days',
//     },
//     table: {
//       noData: 'No data available',
//       noResults: 'No matching records found',
//       loading: 'Loading...',
//       recordsPerPage: 'Records per page:',
//       allRows: 'All',
//       columns: 'Columns',
//     },
//     editor: {
//       url: 'URL',
//       bold: 'Bold',
//       italic: 'Italic',
//       strikethrough: 'Strikethrough',
//       underline: 'Underline',
//       unorderedList: 'Unordered List',
//       orderedList: 'Ordered List',
//       subscript: 'Subscript',
//       superscript: 'Superscript',
//       hyperlink: 'Hyperlink',
//       toggleFullscreen: 'Toggle Fullscreen',
//       quote: 'Quote',
//       left: 'Left align',
//       center: 'Center align',
//       right: 'Right align',
//       justify: 'Justify align',
//       print: 'Print',
//       outdent: 'Decrease indentation',
//       indent: 'Increase indentation',
//       removeFormat: 'Remove formatting',
//       formatting: 'Formatting',
//       fontSize: 'Font Size',
//       align: 'Align',
//       hr: 'Insert Horizontal Rule',
//       undo: 'Undo',
//       redo: 'Redo',
//       heading1: 'Heading 1',
//       heading2: 'Heading 2',
//       heading3: 'Heading 3',
//       heading4: 'Heading 4',
//       heading5: 'Heading 5',
//       heading6: 'Heading 6',
//       paragraph: 'Paragraph',
//       code: 'Code',
//       size1: 'Very small',
//       size2: 'A bit small',
//       size3: 'Normal',
//       size4: 'Medium-large',
//       size5: 'Big',
//       size6: 'Very big',
//       size7: 'Maximum',
//       defaultFont: 'Default Font',
//       viewSource: 'View Source',
//     },
//     tree: { noNodes: 'No nodes available', noResults: 'No matching nodes found' },
//     rtl: false,
//   },
//   iconSet: {
//     name: 'material-icons',
//     type: {
//       positive: 'check_circle',
//       negative: 'warning',
//       info: 'info',
//       warning: 'priority_high',
//     },
//     arrow: {
//       up: 'arrow_upward',
//       right: 'arrow_forward',
//       down: 'arrow_downward',
//       left: 'arrow_back',
//       dropdown: 'arrow_drop_down',
//     },
//     chevron: { left: 'chevron_left', right: 'chevron_right' },
//     colorPicker: { spectrum: 'gradient', tune: 'tune', palette: 'style' },
//     pullToRefresh: { icon: 'refresh' },
//     carousel: {
//       left: 'chevron_left',
//       right: 'chevron_right',
//       up: 'keyboard_arrow_up',
//       down: 'keyboard_arrow_down',
//       navigationIcon: 'lens',
//     },
//     chip: { remove: 'cancel', selected: 'check' },
//     datetime: {
//       arrowLeft: 'chevron_left',
//       arrowRight: 'chevron_right',
//       now: 'access_time',
//       today: 'today',
//     },
//     editor: {
//       bold: 'format_bold',
//       italic: 'format_italic',
//       strikethrough: 'strikethrough_s',
//       underline: 'format_underlined',
//       unorderedList: 'format_list_bulleted',
//       orderedList: 'format_list_numbered',
//       subscript: 'vertical_align_bottom',
//       superscript: 'vertical_align_top',
//       hyperlink: 'link',
//       toggleFullscreen: 'fullscreen',
//       quote: 'format_quote',
//       left: 'format_align_left',
//       center: 'format_align_center',
//       right: 'format_align_right',
//       justify: 'format_align_justify',
//       print: 'print',
//       outdent: 'format_indent_decrease',
//       indent: 'format_indent_increase',
//       removeFormat: 'format_clear',
//       formatting: 'text_format',
//       fontSize: 'format_size',
//       align: 'format_align_left',
//       hr: 'remove',
//       undo: 'undo',
//       redo: 'redo',
//       heading: 'format_size',
//       code: 'code',
//       size: 'format_size',
//       font: 'font_download',
//       viewSource: 'code',
//     },
//     expansionItem: { icon: 'keyboard_arrow_down', denseIcon: 'arrow_drop_down' },
//     fab: { icon: 'add', activeIcon: 'close' },
//     field: {
//       clear: 'cancel',
//       error: `img:data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" style="color:rgb(222,55,55);" width="20" height="20" viewBox="0 0 20 20"><g fill="none" fill-rule="evenodd"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M10 7v4"/><circle cx="10" cy="14" r="1" fill="currentColor"/><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2"/></g></svg>`,
//     },
//     pagination: {
//       first: 'first_page',
//       prev: 'keyboard_arrow_left',
//       next: 'keyboard_arrow_right',
//       last: 'last_page',
//     },
//     rating: { icon: 'grade' },
//     stepper: { done: 'check', active: 'edit', error: 'warning' },
//     tabs: {
//       left: 'chevron_left',
//       right: 'chevron_right',
//       up: 'keyboard_arrow_up',
//       down: 'keyboard_arrow_down',
//     },
//     table: {
//       arrowUp: 'arrow_upward',
//       warning: 'warning',
//       firstPage: 'first_page',
//       prevPage: 'chevron_left',
//       nextPage: 'chevron_right',
//       lastPage: 'last_page',
//     },
//     tree: { icon: 'play_arrow' },
//     uploader: {
//       done: 'done',
//       clear: 'clear',
//       add: 'add_box',
//       upload: 'cloud_upload',
//       removeQueue: 'clear_all',
//       removeUploaded: 'done_all',
//     },
//   },
// }
