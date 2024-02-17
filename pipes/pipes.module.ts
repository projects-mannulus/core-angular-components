import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MappingPipe } from './mapping.pipe';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [MappingPipe],
  declarations: [MappingPipe, SearchFilterPipe],
  providers: [MappingPipe, SearchFilterPipe],
})
export class PipesModule {}
