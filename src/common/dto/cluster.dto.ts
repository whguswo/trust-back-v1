import { IsString, IsEnum } from 'nestjs-swagger-dto';

export const deployment = ['prod', 'dev'] as const;
export type Deployment = (typeof deployment)[number];

export class ClusterDto {
  @IsString({
    description: '프로젝트 이름',
    example: 'Backend',
  })
  name: string;

  @IsString({
    description: '프로젝트 버전',
    example: '1.0.0',
  })
  version: string;

  @IsString({
    description: '프로젝트 설명',
    example: '~~~ 프로젝트의 백엔드입니다.',
  })
  description: string;

  @IsEnum({
    enum: { deployment } as any,
    description: '배포 모드',
    example: deployment[0],
  })
  mode: Deployment;

  @IsString({
    description: '클러스터 이름',
    example: '',
  })
  hostname: string;

  @IsString({
    description: '작성자',
    example: '조현재 (whguswo0818@gmail.com)',
  })
  author: string;
}
