import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async createReport(dto: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        reason: dto.reason,
        listingId: dto.listingId,
        userId: dto.userId,        
      },
    });
  }

  async getAllReports() {
    return this.prisma.report.findMany();
  }

  async getReportById(id: number) {
    return this.prisma.report.findUnique({ where: { id } });
  }

  async deleteReport(id: number) {
    const category = await this.prisma.report.findUnique({ where: { id } });
        if (!category) throw new NotFoundException('Category not found');
    
        return this.prisma.report.delete({ where: { id } });
  }
}
