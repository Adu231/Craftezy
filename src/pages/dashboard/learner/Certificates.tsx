import LearnerLayout from '@/layouts/role/LearnerLayout';
import { Award, Download, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MOCK_COURSES } from '@/services/mockData';

const CERTIFICATES = [
  {
    id: 'cert_001',
    course: MOCK_COURSES[2],
    completedAt: '2026-07-01',
    credentialId: 'CRAFT-2026-001234',
    skills: ['Beginner Knots', 'Pattern Reading', 'Fringe Techniques', 'Color Combining'],
  },
];

export default function LearnerCertificates() {
  return (
    <LearnerLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Certificates</h1>
        <p className="text-muted-foreground text-sm mt-1">{CERTIFICATES.length} certificate earned</p>
      </div>

      {CERTIFICATES.length > 0 ? (
        <div className="space-y-6">
          {CERTIFICATES.map(cert => (
            <div key={cert.id} className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-[hsl(16,57%,50%)] to-[hsl(40,79%,53%)] p-8 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-semibold opacity-80 mb-2">Certificate of Completion</p>
                <h2 className="font-display font-bold text-2xl mb-2">This certifies that</h2>
                <h3 className="font-display font-bold text-3xl mb-3">Jordan Lee</h3>
                <p className="opacity-80 text-sm mb-1">has successfully completed</p>
                <h4 className="font-semibold text-lg mb-4">{cert.course.title}</h4>
                <div className="flex items-center justify-center gap-4 text-sm opacity-80">
                  <span>Issued: {new Date(cert.completedAt).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>ID: {cert.credentialId}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-semibold">{cert.course.title}</h3>
                    <p className="text-sm text-muted-foreground">Instructor: {cert.course.instructor.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl gap-2" onClick={() => toast.info('Download feature coming soon')}>
                      <Download className="w-4 h-4" /> Download
                    </Button>
                    <Button variant="outline" className="rounded-xl gap-2" onClick={() => toast.success('Link copied!')}>
                      <Share2 className="w-4 h-4" /> Share
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3">Skills Certified:</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="rounded-full px-3 py-1 border-primary/30 text-primary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border border-border">
          <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No certificates yet</h3>
          <p className="text-muted-foreground text-sm mb-6">Complete a course to earn your first certificate</p>
          <Button className="btn-primary rounded-xl">Browse Courses</Button>
        </div>
      )}

      {/* In Progress */}
      <div className="mt-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/20 p-6">
        <h3 className="font-semibold mb-1">Certificates In Progress</h3>
        <p className="text-xs text-muted-foreground mb-4">Complete these courses to earn certificates</p>
        <div className="space-y-3">
          {MOCK_COURSES.slice(0, 2).map((c, i) => (
            <div key={c.id} className="flex items-center gap-4 bg-white/60 rounded-xl p-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{c.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${[35, 72][i]}%` }} />
                  </div>
                  <span className="text-xs text-primary font-semibold">{[35, 72][i]}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LearnerLayout>
  );
}
