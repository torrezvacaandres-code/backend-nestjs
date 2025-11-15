import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination-query.dto';
import { PaginatedResult, PaginationMeta } from '../interfaces/pagination.interface';

export class PaginationHelper {
  static async paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    paginationDto: PaginationDto,
    options: FindManyOptions<T> = {},
  ): Promise<PaginatedResult<T>> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const skip = (page - 1) * limit;

    const findOptions: FindManyOptions<T> = {
      ...options,
      skip,
      take: limit,
    };

    const [data, totalRecords] = await repository.findAndCount(findOptions);
    const totalPages = Math.ceil(totalRecords / limit);

    const meta: PaginationMeta = {
      page,
      limit,
      totalRecords,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };

    return {
      data,
      meta,
    };
  }
}
