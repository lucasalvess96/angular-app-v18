import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortHarness } from '@angular/material/sort/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createInitialPaginationState } from '../../utils/pagination.utils';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent<object>>;
  let component: TableComponent<object>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableComponent, NoopAnimationsModule] }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.paginationControl = Object.freeze({ ...createInitialPaginationState(), totalElements: 42 });
    component.columns = [{ key: 'name', header: 'Nome', sortable: true }, { key: 'acoes', header: 'A??es', sortable: false }];
    component.dataSource = [{ name: 'Maria' }];
    fixture.detectChanges();
  });
  it('emits page and sort events without mutating pagination inputs', () => {
    const before = { ...component.paginationControl };
    const page = spyOn(component.pageChange, 'emit');
    const sort = spyOn(component.sortChange, 'emit');
    const event = { pageIndex: 1, pageSize: 20, length: 42 };
    component.onPageChange(event);
    component.onSortChange({ active: 'name', direction: 'desc' });
    expect(page).toHaveBeenCalledOnceWith(event);
    expect(sort).toHaveBeenCalledOnceWith({ active: 'name', direction: 'desc' });
    expect(component.paginationControl).toEqual(before);
  });
  it('disables sorting on actions and emits server sort selection from the header', async () => {
    const sort = await TestbedHarnessEnvironment.loader(fixture).getHarness(MatSortHarness);
    const headers = await sort.getSortHeaders();
    expect(await headers[1].isDisabled()).toBeTrue();
    const emit = spyOn(component.sortChange, 'emit');
    await headers[0].click();
    expect(emit).toHaveBeenCalledWith({ active: 'name', direction: 'asc' });
  });
});
