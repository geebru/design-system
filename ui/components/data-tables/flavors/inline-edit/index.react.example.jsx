/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
import ButtonIcon from 'ui/components/buttons/flavors/icon/index.react';
import SvgIcon from 'app_modules/ui/svg-icon';
import className from 'classnames';
import _ from 'lodash';
import { prefix as pf } from 'app_modules/ui/util/component';

///////////////////////////////////////////
// Partial(s)
///////////////////////////////////////////

let Container = props =>
  <div className={pf('table--edit_container is-relative')} tabIndex={props.tabIndex} id={props.id}>
    {props.children}
  </div>;

let Table = props =>
    <table className={pf('table table--edit table--bordered table--fixed-layout')} role="grid">
      {props.children}
    </table>;

let Thead = props =>
  <thead>
    <Tr className={pf('text-title--caps')}>
      { props.rowError ?
        <th className={pf('cell-shrink indicator-header')} scope="col"><span className={pf('slds-assistive-text')}>Errors</span></th>
      : null }
      <td className={pf('cell-shrink')} role="gridcell"><div className={pf('p-horizontal--x-small')}><Checkbox label="Select All" /></div></td>
      <Th className={pf('is-sortable is-resizable')} scope="col" navigationModeTabIndex={props.navigationModeTabIndex}>Name</Th>
      <Th className={pf('is-sortable is-resizable')} scope="col" navigationModeTabIndex={props.navigationModeTabIndex}>Company</Th>
      <Th className={pf('is-sortable is-resizable')} scope="col" navigationModeTabIndex={props.navigationModeTabIndex}>Address</Th>
      <Th className={pf('is-sortable is-resizable')} scope="col" navigationModeTabIndex={props.navigationModeTabIndex}>Email</Th>
      <Th className={pf('is-sortable is-resizable')} scope="col" navigationModeTabIndex={props.navigationModeTabIndex}>Phone</Th>
      <Th className={pf('is-sortable is-resizable')} scope="col" navigationModeTabIndex={props.navigationModeTabIndex}>Status</Th>
      <Th className={pf('is-sortable is-resizable')} scope="col" navigationModeTabIndex={props.navigationModeTabIndex}>Confidence</Th>
      <th className={pf('cell-shrink')} scope="col"><span className={pf('assistive-text')}>Actions</span></th>
    </Tr>
  </thead>;

let Tbody = props =>
  <tbody>
    {props.children}
  </tbody>;

let Tr = props =>
  <tr {...props}>
    {props.children}
  </tr>;

let Th = (props) => {
  const rangeLabel = props.children + ' column width';
  let sortDirection;
  if(props.ariaSort) {
    sortDirection = (props.ariaSort === 'ascending' ? 'Sorted ascending' : 'Sorted descending' );
  }
  const uniqueId = _.uniqueId('cell-resize-handle-');

  return(
    <th className={pf(props.className)} scope={props.scope} style={props.style} aria-label={props.children} aria-sort={props.ariaSort}>
      <a href="javascript:void(0);" className={pf('th__action text-link--reset')} tabIndex={props.navigationModeTabIndex}>
        <span className={pf('assistive-text')}>Sort </span>
        <span className={pf('truncate')} title={props.children}>{ props.children }</span>
        <div className={pf('icon_container')}>
          <SvgIcon className={pf('icon icon--x-small icon-text-default is-sortable__icon')} sprite="utility" symbol="arrowdown" />
        </div>
        <span className={pf('assistive-text')} aria-live="assertive" aria-atomic="true">{sortDirection}</span>
      </a>
      <div className={pf('resizable')}>
        <label htmlFor={uniqueId} className={pf('assistive-text')}>{rangeLabel}</label>
        <input className={pf('resizable__input assistive-text')} type="range" min="20" max="1000" id={uniqueId} tabIndex={props.navigationModeTabIndex} />
        <span className={pf('resizable__handle')}>
          <span className={pf('resizable__divider')}></span>
        </span>
      </div>
    </th>
  );
};

let Td = props =>
  <td
    aria-readonly={props.ariaReadonly}
    aria-selected={props.ariaSelected}
    className={pf(props.className)}
    data-label={props.dataLabel}
    role="gridcell"
    scope={props.scope}
    tabIndex={props.tabIndex}
  >
    { props.children }
  </td>;

let Checkbox = props =>
  <label className={pf('checkbox')}>
    <input type="checkbox" name="options" disabled={props.disabled} defaultChecked={props.checked} tabIndex={props.tabIndex || '-1'} id={props.checkID} />
    <span className={pf('checkbox--faux')}></span>
    <span className={pf('assistive-text')}>{props.label}</span>
  </label>;

let ButtonEdit = props =>
  <button className={pf('button button--icon cell-edit__button m-left--x-small')} tabIndex={props.tabIndex || '-1'} disabled={props.disabled} id={props.id}>
    <span className={pf('assistive-text')}>{props.alt}</span>
    <SvgIcon className={className(pf('button__icon button__icon--hint'), props.iconClassName)} sprite="utility" symbol={props.symbol || 'edit'} />
  </button>;

let EditPanel = props =>
  <div className={pf('popover popover--edit')} role="dialog" style={{ position: 'absolute', top: '2.1rem', left: '10.875rem' }}>
    <span id="form-start" tabIndex="0"></span>
    <div className={pf('popover__body')}>
      { props.children }
    </div>
    <span id="form-end" tabIndex="0"></span>
  </div>;

let TableFocusInfo = props =>
  <div className={pf('box table--edit_container-message')}>
    <p>To access the list, press Enter.</p>
    <p>To exit the list, press Esc.</p>
  </div>;

let ErrorPanel = props =>
  <div className={pf('popover nubbin--bottom-left theme--error')} role="dialog" style={{ position: 'absolute', top: '-0.25rem', left: '-0.75rem', width: 'auto' }}>
    <div className={pf('popover__body')}>Company encountered an error.</div>
</div>;

let RowData = (props) => {
  let checkboxLabel = 'Select row ' + props.title;

  return(
    <Tr ariaSelected={props.checkSelected} className={pf('hint-parent')}>
      { props.rowError ?
          <td tabIndex={props.errorindex} className={pf(' cell-error')}>
            <div id={props.cellID} className={className(pf('cell-edit p-left--small'), props.editName)}>
              <button className={pf('button button--icon button--icon-error')} tabIndex={props.navigationModeTabIndex} id="error-01">
                <span className={pf('assistive-text')}>Row has errors</span>
                <SvgIcon className={pf('button__icon')} sprite="utility" symbol="warning" />
              </button>
            </div>
          </td>
        : null }
      <Td tabIndex={props.initialCellTabIndex} className={pf('cell-shrink')}>
        <div className={className(pf('cell-edit'), props.checkClass)}>
          <Checkbox label={checkboxLabel} tabIndex={props.navigationModeTabIndex} checkID="checkbox-01" />
        </div>
      </Td>
      <th>
        <span className={className(pf('grid grid--align-spread cell-edit'), props.thClassName)}>
          <a href="javascript:void()" className={pf('truncate grow')} tabIndex={props.navigationModeTabIndex} id={props.linkId} title="Lei Chan">Lei Chan</a>
          <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Name: Lei Chan" />
        </span>
      </th>
      { props.children }
      <Td>
        <span className={pf('grid grid--align-spread cell-edit')}>
          <span className={pf('truncate grow')} title="12 Embarcadero Plaza, San Francisco, CA 94105 United States">12 Embarcadero Plaza, San Francisco, CA 94105</span>
          <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Address: 12 Embarcadero Plaza, San Francisco, CA 94105 United States" />
        </span>
      </Td>
      <Td>
        <span className={pf('grid grid--align-spread cell-edit')}>
          <span className={pf('truncate grow')} title="jdoe@acme.com">jdoe@acme.com</span>
          <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Email: jdoe@acme.com" />
        </span>
      </Td>
      <Td ariaReadonly="true">
        <span className={pf('grid grid--align-spread cell-edit')}>
          <span className={pf('truncate grow')} title="800-555-1212">800-555-1212</span>
          <ButtonEdit iconClassName="button__icon--lock button__icon--small" tabIndex={props.navigationModeTabIndex} alt="Edit Phone: 800-555-1212" symbol="lock" disabled />
        </span>
      </Td>
      <Td>
        <span className={pf('grid grid--align-spread cell-edit')}>
          <span className={pf('truncate grow')} title="Contacted">Contacted</span>
          <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Status: Contacted" />
        </span>
      </Td>
      <Td>
        <span className={pf('grid grid--align-spread cell-edit')}>
          <span className={pf('truncate grow text-align--right')} title="60%">60%</span>
          <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Confidence: 60%" />
        </span>
      </Td>
      <Td className={pf('cell-shrink')}>
        <div className={pf('cell-edit')}>
          <ButtonIcon
            flavor="icon-border-filled,icon-x-small"
            iconFlavor="hint,small"
            sprite="utility"
            symbol="down"
            assistiveText="Show More"
            tabIndex={props.navigationModeTabIndex} />
        </div>
      </Td>
    </Tr>
  );
};

let RowDataStatic = props =>
  <Tr className={pf('hint-parent')}>
    { props.rowError ?
      <td className={pf('cell-error')}>
        <div id={props.cellID} className={className(pf('cell-edit p-left--small'), props.editName)}>
          <button className={pf('hidden button button--icon button--icon-error')} tabIndex={props.navigationModeTabIndex} id="error-01" aria-hidden="true">
            <span className={pf('assistive-text')}>Row has no errors</span>
            <SvgIcon className={pf('button__icon')} sprite="utility" symbol="warning" />
          </button>
        </div>
      </td>
      : null }
    <Td className={pf('cell-shrink')}>
      <div className={pf('cell-edit')}>
        <Checkbox label="Select Row John Doe" tabIndex={props.navigationModeTabIndex} />
      </div>
    </Td>
    <th>
      <span className={pf('grid grid--align-spread cell-edit')}>
        <a href="javascript:void()" className={pf('truncate grow')} tabIndex={props.navigationModeTabIndex} title="John Doe">John Doe</a>
        <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Name: John Doe" />
      </span>
    </th>
    <Td>
      <span className={pf('grid grid--align-spread cell-edit')}>
        <span className={pf('truncate grow')} title="Rohde Corp">Rohde Corp</span>
            <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Company: Rohde Corp" />
      </span>
    </Td>
    <Td>
      <span className={pf('grid grid--align-spread cell-edit')}>
        <span className={pf('truncate grow')} title="1 Ferry Building San Francisco, CA 94105">1 Ferry Building San Francisco, CA 94105</span>
        <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Address: 1 Ferry Building San Francisco, CA 94105 United States" />
      </span>
    </Td>
    <Td>
      <span className={pf('grid grid--align-spread cell-edit')}>
        <span className={pf('truncate grow')} title="lchan@rohdecorp.com">lchan@rohdecorp.com</span>
        <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Email: lchan@rohdecorp.com" />
      </span>
    </Td>
    <Td ariaReadonly="true">
      <span className={pf('grid grid--align-spread cell-edit')}>
        <span className={pf('truncate grow')} title="800-555-1212">800-555-1212</span>
        <ButtonEdit iconClassName="button__icon--lock button__icon--small" tabIndex={props.navigationModeTabIndex} alt="Edit Phone: 800-555-1212" symbol="lock" disabled />
      </span>
    </Td>
    <Td>
      <span className={pf('grid grid--align-spread cell-edit')}>
        <span className={pf('truncate grow')} title="New">New</span>
        <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Status: New" />
      </span>
    </Td>
    <Td>
      <span className={pf('grid grid--align-spread cell-edit')}>
        <span className={pf('truncate grow text-align--right')} title="20%">20%</span>
        <ButtonEdit iconClassName="button__icon--edit" tabIndex={props.navigationModeTabIndex} alt="Edit Confidence: 20%" />
      </span>
    </Td>
    <Td className={pf('cell-shrink')}>
      <div className={pf('cell-edit')}>
        <ButtonIcon
          flavor="icon-border-filled,icon-x-small"
          iconFlavor="hint,small"
          sprite="utility"
          symbol="down"
          assistiveText="Show More"
          tabIndex={props.navigationModeTabIndex} />
      </div>
    </Td>
  </Tr>;


//////////////////////////////////////////////
// Export
//////////////////////////////////////////////

export let states = [
  {
    id: 'data-table-inline-edit',
    label: 'Default',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="-1" />
          <Tbody>
            <RowData title="Lei Chan" initialCellTabIndex="0" navigationModeTabIndex="-1">
              <Td>
                <span className={pf('grid grid--align-spread cell-edit')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="-1" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="-1" />
          </Tbody>
        </Table>
      </Container>
  },
  {
    id: 'data-table-inline-edit-checkbox',
    label: 'Cell focused - Checkbox',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" checkClass={pf('has-focus')} checkSelected="true" navigationModeTabIndex="0">
              <Td>
                <span className={pf('grid grid--align-spread cell-edit')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit id="button-01" iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('checkbox-01').focus()
    `
  },
  {
    id: 'data-table-inline-edit-with-link',
    label: 'Cell focused - Link',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" thClassName={pf('has-focus')} linkId="link-01" navigationModeTabIndex="0">
              <Td ariaSelected="true">
                <span className={pf('grid grid--align-spread cell-edit')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('link-01').focus()
    `
  },
  {
    id: 'data-table-inline-edit-focused',
    label: 'Cell focused',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" navigationModeTabIndex="0">
              <Td>
                <span className={pf('grid grid--align-spread cell-edit has-focus')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit id="button-01" iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('button-01').focus()
    `
  },
  {
    id: 'data-table-inline-edit-edited',
    label: 'Cell edited',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" navigationModeTabIndex="0">
              <Td>
                <span className={pf('grid grid--align-spread cell-edit is-edited')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
      </Container>
  },
  {
    id: 'data-table-inline-edit-field-error',
    label: 'Error - Field level',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" navigationModeTabIndex="0">
              <Td>
                <span className={pf('grid grid--align-spread cell-edit has-error')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: {field error} Edited: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
      </Container>
  },
  {
    id: 'data-table-inline-edit-field-error-focused',
    label: 'Error - Field level focused',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" navigationModeTabIndex="0">
              <Td ariaSelected="true">
                <span className={pf('grid grid--align-spread cell-edit has-error')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: {field error} Edited: Acme Enterprises" id="button-01" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('button-01').focus()
    `
  },
  {
    id: 'data-table-inline-edit-row-error',
    label: 'Error - Row level on save',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" rowError />
          <Tbody>
            <RowData rowError title="Acme Enterprises" navigationModeTabIndex="0">
              <Td ariaSelected="true">
                <span className={pf('grid grid--align-spread cell-edit has-error')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: {field error} Edited: Acme Enterprises" id="button-01" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic rowError navigationModeTabIndex="0" />
          </Tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('button-01').focus()
    `
  },
  {
    id: 'data-table-inline-edit-row-error-focus',
    label: 'Error indicator - Focused',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" rowError />
          <Tbody>
            <RowData rowError editName={pf('indicator-error')} errorindex="0" title="Acme Enterprises" navigationModeTabIndex="0">
              <Td>
                <span className={pf('grid grid--align-spread cell-edit has-error')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic rowError navigationModeTabIndex="0" />
          </Tbody>
        </Table>
        <ErrorPanel />
      </Container>,
    script: `
      document.getElementById('error-01').focus()
    `
  },
  {
    id: 'data-table-inline-edit-row-no-error-focus',
    label: 'No Error indicator - Focused',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" rowError />
          <Tbody>
            <RowData rowError title="Acme Enterprises" navigationModeTabIndex="0">
              <Td>
                <span className={pf('grid grid--align-spread cell-edit has-error has-focus')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic rowError editName={pf('indicator-error-none')} cellID="no-error-01" navigationModeTabIndex="0" />
          </Tbody>
        </Table>
      </Container>
  },
  {
    id: 'data-table-inline-edit-basic',
    label: 'Cell edit',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" navigationModeTabIndex="0">
              <Td ariaSelected="true">
                <span className={pf('grid grid--align-spread cell-edit')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
        <EditPanel>
          <div className={pf('form-element grid')}>
            <label className={pf('form-element__label form-element__label--edit no-flex')} htmlFor="company-01">
              <span className={pf('assistive-text')}>Company</span>
            </label>
            <div className={pf('form-element__control grow')}>
              <input id="company-01" className={pf('input')} type="text" defaultValue="Acme Enterprises" />
            </div>
          </div>
        </EditPanel>
      </Container>,
    script: `
      document.getElementById('company-01').focus()
      document.getElementById('company-01').select()
    `
  },
  {
    id: 'data-table-inline-edit-required',
    label: 'Cell edit — Required',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" navigationModeTabIndex="0">
              <Td ariaSelected="true">
                <span className={pf('grid grid--align-spread cell-edit is-editing')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
        <EditPanel>
          <div className={pf('form-element grid')}>
            <label className={pf('form-element__label form-element__label--edit no-flex')} htmlFor="company-01">
              <abbr className={pf('slds-required')} title="required">*</abbr>
              <span className={pf('assistive-text')}>Company</span>
            </label>
            <div className={pf('form-element__control grow')}>
              <input id="company-01" className={pf('input input--required')} type="text" defaultValue="Acme Enterprises" required />
            </div>
          </div>
        </EditPanel>
      </Container>,
    script: `
      document.getElementById('company-01').focus()
      document.getElementById('company-01').select()
    `
  },
  {
    id: 'data-table-inline-edit-error',
    label: 'Cell edit — Error',
    element:
      <Container>
        <Table>
          <Thead navigationModeTabIndex="0" />
          <Tbody>
            <RowData title="Acme Enterprises" navigationModeTabIndex="0">
              <Td ariaSelected="true">
                <span className={pf('grid grid--align-spread cell-edit is-editing')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="0" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="0" />
          </Tbody>
        </Table>
        <EditPanel>
          <div className={pf('form-element has-error grid wrap')}>
            <label className={pf('form-element__label form-element__label--edit no-flex')} htmlFor="company-01">
              <abbr className={pf('slds-required')} title="required">*</abbr>
              <span className={pf('assistive-text')}>Company</span>
            </label>
            <div className={pf('form-element__control grow')}>
              <input id="company-01" className={pf('input input--required')} type="text" defaultValue="Acme Enterprises" required aria-describedby="error-message-01" />
            </div>
          <div id="error-message-01" className={pf('form-element__help')}>This field is required</div>
          </div>
        </EditPanel>
      </Container>,
    script: `
      document.getElementById('company-01').focus()
      document.getElementById('company-01').select()
    `
  },
  {
    id: 'data-table-inline-table-matte',
    label: 'Table focused',
    element:
      <Container tabIndex="1" id="table-edit-01">
        <Table>
          <Thead navigationModeTabIndex="-1" />
          <Tbody>
            <RowData title="Acme Enterprises" navigationModeTabIndex="-1">
              <Td>
                <span className={pf('grid grid--align-spread cell-edit has-focus')}>
                  <span className={pf('truncate grow')} title="Acme Enterprises">Acme Enterprises</span>
                  <ButtonEdit iconClassName="button__icon--edit" tabIndex="-1" alt="Edit Company: Acme Enterprises" />
                </span>
              </Td>
            </RowData>
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
            <RowDataStatic navigationModeTabIndex="-1" />
          </Tbody>
        </Table>
        <TableFocusInfo />
      </Container>,
    script: `
      document.getElementById('table-edit-01').focus()
    `
  }
];
