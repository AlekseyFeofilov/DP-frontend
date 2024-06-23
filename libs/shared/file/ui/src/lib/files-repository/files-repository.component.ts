import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  booleanAttribute,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileStoreFacade } from '@dp/shared/file/store';
import { FileInfo } from '@dp/shared/file/types';
import { AttachmentEntity } from '@dp/shared/types';
import { TuiLetModule, TuiMapperPipeModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiLinkModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import {
  TuiCardModule,
  TuiHeaderModule,
  TuiSurfaceModule,
} from '@taiga-ui/experimental';
import { TuiFileLike, TuiInputFilesModule } from '@taiga-ui/kit';

@Component({
  selector: 'dp-files-repository',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TuiInputFilesModule,
    TuiCardModule,
    TuiCardModule,
    TuiSurfaceModule,
    TuiInputFilesModule,
    TuiMapperPipeModule,
    TuiHeaderModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiLetModule,
  ],
  providers: [],
  templateUrl: './files-repository.component.html',
  styleUrl: './files-repository.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesRepositoryComponent implements OnChanges {
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ required: true }) entity!: AttachmentEntity;

  private readonly fileStoreFacade = inject(FileStoreFacade);

  readonly filesInfo$ = this.fileStoreFacade.filesInfo$;
  readonly loadingFilesIds$ = this.fileStoreFacade.loadingFilesIds$;
  readonly isLoading$ = this.fileStoreFacade.isLoading$;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity']) {
      this.fileStoreFacade.load(changes['entity'].currentValue);
    }
  }

  isFileInfoLoading(fileInfo: FileInfo, loadingFilesIds: string[]): boolean {
    return !!loadingFilesIds.includes(fileInfo.id);
  }

  sortFilesInfo(filesInfo: ReadonlyArray<FileInfo>): FileInfo[] {
    return [...filesInfo].sort((f1, f2) =>
      f1.createDate.dayAfter(f2.createDate) ? -1 : 1,
    );
  }

  parseFileInfoToFileLike(file: FileInfo): TuiFileLike {
    return {
      content: file.createDate,
      name: file.name,
      size: file.size,
      type: file.contentType,
    };
  }

  saveFileLocally(fileInfo: FileInfo) {
    this.fileStoreFacade.saveLocally(fileInfo);
  }

  removeFile(fileInfo: FileInfo) {
    this.fileStoreFacade.remove(fileInfo, this.entity);
  }

  addFile(file: File) {
    this.fileStoreFacade.create(file, this.entity);
  }
}
