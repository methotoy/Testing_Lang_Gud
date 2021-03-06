import {DateFormatFilter} from './filters/date_format.filter';
import {TruncateStringFilter} from './filters/truncate_string.filter';
import {RequestStatusFilter} from './filters/request_status.filter';
import {MdPickerDateFormatFilter} from './filters/md_picker_date_format.filter';
import {CapitalizeFilter} from './filters/capitalize.filter';
import {HumanReadableFilter} from './filters/human_readable.filter';
import {TruncatCharactersFilter} from './filters/truncate_characters.filter';
import {TruncateWordsFilter} from './filters/truncate_words.filter';
import {TrustHtmlFilter} from './filters/trust_html.filter';
import {UcFirstFilter} from './filters/ucfirst.filter';

angular.module('app.filters')
	.filter('dateFormat', DateFormatFilter)
	.filter('truncateString', TruncateStringFilter)
	.filter('requestStatus', RequestStatusFilter)
	.filter('mdPickerDateFormat', MdPickerDateFormatFilter)
	.filter('capitalize', CapitalizeFilter)
	.filter('humanReadable', HumanReadableFilter)
	.filter('truncateCharacters', TruncatCharactersFilter)
	.filter('truncateWords', TruncateWordsFilter)
	.filter('trustHtml', TrustHtmlFilter)
	.filter('ucfirst', UcFirstFilter);
