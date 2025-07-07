import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async createReport(@Body() dto: CreateReportDto) {
    return this.reportService.createReport(dto);
  }

  @Get()
  async getAllReports() {
    return this.reportService.getAllReports();
  }

  @Get(':id')
  async getReportById(@Param('id') id: string) {
    const report = await this.reportService.getReportById(+id);
    if (!report) throw new NotFoundException('Category not found');
        return report;
  }

  @Delete(':id')
  async deleteReport(@Param('id') id: string) {
    return this.reportService.deleteReport(+id);
  }
}
